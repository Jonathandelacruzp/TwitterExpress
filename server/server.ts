import dotenv from 'dotenv';
import express from 'express';
import request from 'request';
import qs from 'querystring';
import crypto from 'crypto';
import session from 'express-session';
import OAuth from 'oauth-1.0a';
import OAuthRequest from 'oauth-request';
import { TwitterModel } from './interfaces/twitterModel';
import { ErrorModel } from './interfaces/errorModel';

const MemoryStore: any = require('memorystore')(session)

dotenv.config();

const _twitterConsumerKey: string = process.env.TWITTER_CONSUMER_KEY!;
const _twitterConsumerSecret: string = process.env.TWITTER_CONSUMER_SECRET!;

const _port = process.env.PORT! || 8080;
const _modeEnv: string = process.env.NODE_ENV!;
const _applicationUrl: string = _modeEnv === 'development' ? `${process.env.APPLICATION_URL!}:${_port}` : process.env.APPLICATION_URL!;

const _OAuthOptions: OAuth.Options = {
    consumer: {
        key: _twitterConsumerKey,
        secret: _twitterConsumerSecret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString: string, key: string) {
        return crypto.createHmac('sha1', key).update(baseString).digest('base64')
    },
}

var app: express.Application = express();
app.use(express.json())
app.use(session({
    cookie: { maxAge: 14400000 },
    store: new MemoryStore({
        checkPeriod: 14400000 // prune expired entries every 8h
    }),
    secret: 'catito',
    resave: false,
    saveUninitialized: true
}));

const oauth: OAuth = new OAuth(_OAuthOptions);

app.get('/', function (req: express.Request, res: express.Response) {
    res.send("twitter express")
})

app.get('/auth/twitter', function (req: any, res: express.Response) {
    const options: OAuth.RequestOptions = {
        url: 'https://api.twitter.com/oauth/request_token',
        method: 'POST',
        data: {
            oauth_callback: `${_applicationUrl}/auth/twitter/callback`
        },
    }
    request(
        {
            url: options.url,
            method: options.method,
            form: options.data,
            headers: oauth.toHeader(oauth.authorize(options))
        },
        function (error, response, body) {
            var resData = qs.parse(body)
            if (error) {
                res.statusCode = 500;
                res.send(resData);
            }

            req.session.oauthRequestToken = resData.oauth_token;
            req.session.oauthRequestTokenSecret = resData.oauth_token_secret;

            res.redirect(`https://api.twitter.com/oauth/authorize?${qs.stringify({ oauth_token: resData.oauth_token })}`);
        }
    )
})


app.get('/auth/twitter/callback', function (req: any, res: express.Response) {
    const options: OAuth.RequestOptions = {
        url: 'https://api.twitter.com/oauth/access_token',
        method: 'POST',
        data: {
            // oauth_consumer_key: _twitterConsumerKey,
            oauth_verifier: req.query.oauth_verifier,
            oauth_token: req.query.oauth_token,
        },
    }
    request(
        {
            url: options.url,
            method: options.method,
            form: oauth.authorize(options),
            headers: oauth.toHeader(oauth.authorize(options))
        },
        function (error, response, body) {
            var resData = qs.parse(body)
            if (error) {
                res.statusCode = 500;
                res.send(resData);
            }

            console.log(resData)

            req.session.oauthToken = resData.oauth_token;
            req.session.oauthTokenSecret = resData.oauth_token_secret;
            req.session.userId = resData.user_id;
            req.session.screenName = resData.screen_name;

            // res.send(resData)

            res.redirect(`https://api.twitter.com/oauth/authorize?${qs.stringify({ oauth_token: resData.oauth_token })}`);
        }
    )
})

app.get('/twitter/user_timeline', function (req: any, res: express.Response) {
    var twitter = OAuthRequest(_OAuthOptions)

    var authToken: object = {
        key: req.session.oauthToken,
        secret: req.session.oauthTokenSecret,
    }

    twitter.setToken(authToken);

    twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', function (error, response, body) {
        if (error) {
            let resData: ErrorModel = JSON.parse(body)
            res.statusCode = 500;
            res.send(resData);
        } else {
            let resData: TwitterModel = JSON.parse(body)
            res.send(resData)
        }
    });
})


app.listen(_port, () => console.log(`Listening on port ${_port}`));
