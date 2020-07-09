import dotenv from 'dotenv';

dotenv.config();

class GlobalVariables {
    constructor() { }
    public twitterConsumerKey: string = process.env.TWITTER_CONSUMER_KEY!;
    public twitterConsumerSecret: string = process.env.TWITTER_CONSUMER_SECRET!;
    public port: string = process.env.PORT!;
    public modeEnv: string = process.env.NODE_ENV!;
    public applicationUrl: string = this.modeEnv === 'development' ? `${process.env.APPLICATION_URL!}:${this.port}` : process.env.APPLICATION_URL!;
}

export const EnvInstance: GlobalVariables = new GlobalVariables();