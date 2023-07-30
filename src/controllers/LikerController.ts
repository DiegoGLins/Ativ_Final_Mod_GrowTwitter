import { Follow } from "../Types/FollowUserType"
import { users } from "../database/users"
import { Liker } from "../models/LikerModel"
import Tweet from "../models/TweetModel"

export class LikerController {

    public addLike(tweet: Tweet, authorlike: Follow) {
        const findUser = users.find(item => item.id === authorlike.id)
        const findTweet = findUser?.tweets.find(item => item.getId() === tweet.getId())

        if (findTweet) {
            const newLike = new Liker(tweet,authorlike)
            return newLike
        }
    }

}