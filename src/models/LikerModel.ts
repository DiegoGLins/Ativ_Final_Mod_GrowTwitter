import { Follow } from "../Types/FollowUserType";
import Tweet from "./TweetModel";


export class Liker {
    public tweetLiked: Tweet;
    public authorlike: Follow
    constructor(tweetLiked: Tweet, authorlike: Follow) {
        this.tweetLiked = tweetLiked;
        this.authorlike = authorlike
    }
}
