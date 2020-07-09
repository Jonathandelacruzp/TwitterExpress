import { EnvInstance as Env } from './../globals/Env'
import { Controller, Get, Route, Request, SuccessResponse } from 'tsoa';
import * as express from "express";
import crypto from 'crypto';
import request from 'request';
import OAuth from 'oauth-1.0a';
import qs from 'querystring';

interface oauthResponse {
    oauth_token?: string,
    oauth_token_secret?: string;
}

@Route('auth')
export class AuthController extends Controller {
    oauth: OAuth;

    constructor() {
        super();
        let oAuthOptions: OAuth.Options = {
            consumer: {
                key: Env.twitterConsumerKey,
                secret: Env.twitterConsumerSecret,
            },
            signature_method: 'HMAC-SHA1',
            hash_function(baseString: string, key: string) {
                return crypto.createHmac('sha1', key).update(baseString).digest('base64')
            },
        };
        this.oauth = new OAuth(oAuthOptions)
    }

    @Get('/twitter')
    @SuccessResponse(302, "Redirect")
    public async twitter(@Request() req: express.Request) {
        const res = (<any>req).res as express.Response;
        const options: OAuth.RequestOptions = {
            url: 'https://api.twitter.com/oauth/request_token',
            method: 'POST',
            data: {
                oauth_callback: `${Env.applicationUrl}/auth/twitter/callback`
            },
        }
        request(
            {
                url: options.url,
                method: options.method,
                form: options.data,
                headers: this.oauth.toHeader(this.oauth.authorize(options))
            },
            function (error, response, body) {
                let resData: oauthResponse = qs.parse(body)
                if (error) {
                    res.status(500).send(resData);
                    return;
                }
                req.session!.oauthRequestToken = resData.oauth_token;
                req.session!.oauthRequestTokenSecret = resData.oauth_token_secret;
                res.redirect(`https://api.twitter.com/oauth/authorize?${qs.stringify({ oauth_token: resData.oauth_token })}`);
                return;
            }
        )
        return;
    }

    @Get('/twitter/callback')
    @SuccessResponse(302, "Redirect")
    public async callback(@Request() req: express.Request) {
        const res = (<any>req).res as express.Response;
        const options: OAuth.RequestOptions = {
            url: 'https://api.twitter.com/oauth/access_token',
            method: 'POST',
            data: {
                oauth_verifier: req.query.oauth_verifier,
                oauth_token: req.query.oauth_token,
            },
        }
        request(
            {
                url: options.url,
                method: options.method,
                form: this.oauth.authorize(options),
                headers: this.oauth.toHeader(this.oauth.authorize(options))
            },
            function (error, response, body) {
                var resData = qs.parse(body)
                if (error) {
                    res.status(500).send(resData);
                    return;
                }

                console.log(resData)

                req.session!.oauthToken = resData.oauth_token;
                req.session!.oauthTokenSecret = resData.oauth_token_secret;
                req.session!.userId = resData.user_id;
                req.session!.screenName = resData.screen_name;

                res.redirect(`https://api.twitter.com/oauth/authorize?${qs.stringify({ oauth_token: resData.oauth_token })}`);
                return;
            }
        )
    }
}