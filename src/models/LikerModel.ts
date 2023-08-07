import { v4 as createUuid } from 'uuid'
import { users } from "../database/users";
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

}
