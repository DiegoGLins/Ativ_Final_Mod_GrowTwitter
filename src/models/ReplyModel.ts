import {v4 as createUuid} from 'uuid'
import { Liker } from "./LikerModel";
import { TweetType } from '../Types/TweetType';
import { Follow } from '../Types/FollowUserType';
import Tweet from './TweetModel';
import { User } from './UserModel';

export class Reply {
    protected tweetReplyId: string;
    public likes: Liker[];
    public authorReply: User;
    public authorTweet: User;
    public replyTo: string
    public contentTweetReply: string;
    public tipo: TweetType.reply

    constructor(replyTo: string, authorTweet: User, authorReply: User, contentTweetReply: string) {
        this.tweetReplyId = createUuid()
        this.authorReply = authorReply
        this.authorTweet = authorTweet
        this.replyTo = replyTo;
        this.contentTweetReply = contentTweetReply;
        this.likes = [];
        this.tipo = TweetType.reply
    }

    public getIdReply() {
        return this.tweetReplyId
    }

    public includeLikeReply(tweet: Liker) {
        this.likes.push(tweet)
      }

    public removeLikeReply(likeId: Liker) {
        const index = this.likes.findIndex(item => item.likedId === likeId.likedId)
        if (index !== -1) {
          this.likes.splice(index, 1)
        }
      }


    public detailReplie() {
        return {
            id: this.getIdReply(),
            authorReply: this.authorReply.username,
            contentTweetReply: this.contentTweetReply,
            replyTo: this.replyTo
        }
    }
}