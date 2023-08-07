import { v4 as createUuid } from 'uuid'
import { users } from "../database/users";
import Tweet from './TweetModel';
import { Reply } from './ReplyModel';
import { User } from './UserModel';
import { Follow } from '../Types/FollowUserType';

export class Liker {
    public likedId: string;
    public authorlike: Follow
    public tweetLiked: string
    constructor(tweetLiked: string, authorlike: Follow) {
        this.tweetLiked = tweetLiked;
        this.likedId = createUuid();
        this.authorlike = authorlike
    }


    public nameAuthorLike() {
        const name = users.find(item => item.detailFollow() === this.authorlike)

        return { name: name?.detailFollow().username}
    }
}
