import Tweet from "../models/TweetModel";


export interface Follow {
    id: string;
    name: string;
    username: string;
    email: string;
    numberFollowing: number;
    tweets: Tweet[]
  }