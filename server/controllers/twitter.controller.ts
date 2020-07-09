import { Controller, Get, Route, Request, Response, SuccessResponse } from 'tsoa';
import { Request as eRequest, Response as eResponse } from 'express';
import crypto from 'crypto';
import request from 'request';
import OAuth from 'oauth-1.0a';
import OAuthRequest from 'oauth-request';
import { EnvInstance as Env } from './../globals/Env'
import { ErrorModel } from '../interfaces/errorModel';
import { UserTimeline } from '../interfaces/twitterModel';

@Route('twitter')
export class TwitterController extends Controller {
    oauth: OAuth;
    oAuthOptions: OAuth.Options;

    constructor() {
        super();
        this.oAuthOptions = {
            consumer: {
                key: Env.twitterConsumerKey,
                secret: Env.twitterConsumerSecret,
            },
            signature_method: 'HMAC-SHA1',
            hash_function(baseString: string, key: string) {
                return crypto.createHmac('sha1', key).update(baseString).digest('base64')
            },
        };
        this.oauth = new OAuth(this.oAuthOptions)
    }

    @Response<ErrorModel>('400', 'Bad request')
    @Get('user_timeline')
    public async userTimeline(@Request() req: eRequest) {
        let result!: UserTimeline;
        let twitter: any = OAuthRequest(this.oAuthOptions)
        let authToken: object = {
            key: req.session!.oauthToken,
            secret: req.session!.oauthTokenSecret,
        }
        
        twitter.setToken(authToken);
        twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', (error, response, body) => {
            if (error) {
                let resData: ErrorModel = JSON.parse(body)
                return resData;
            } else {
                let resData: UserTimeline = JSON.parse(body)
                result = resData;
            }
        });
        return { result };
    }
}