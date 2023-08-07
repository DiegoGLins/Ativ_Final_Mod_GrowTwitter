import { Follow } from "../Types/FollowUserType"
import { replies } from "../database/replies"
import { tweets } from "../database/tweets"
import { users } from "../database/users"
import { Liker } from "../models/LikerModel"

class LikerController {
  //---------- Curtindo ----------//
  public addLike(authorlike: Follow, tweetliked: string, authorTweet: Follow) {
    users.find(item => item.id === authorTweet.id)
    const existTweet = tweets.find(item => item.content === tweetliked)

    if (existTweet) {
      const newLike = new Liker(tweetliked, authorlike)
      existTweet.includeLike(newLike)
      return newLike
    }

    const existReply = replies.find(item=>item.contentTweetReply === tweetliked)

    if (existReply) {
      const newReplyLike = new Liker(tweetliked, authorlike)
      existReply.includeLikeReply(newReplyLike)
      return newReplyLike
    }
    else {
      console.log("Tweet ou reply não econtrado")
    }
  }

  //---------- Removendo a curtida ----------//

  public removeLike(tweetLiked: Liker, authorLiked: Liker) {
    const existUser = users.find(item => item.detailFollow().id === authorLiked.authorlike.id)
    const existLike = existUser?.tweets.find(item => item.getId() === tweetLiked.tweetLiked)

    if (existLike) {
      existLike.removeLike(tweetLiked)
    }
    else if (!existLike) {
      const likeReply = existUser?.replie.find(item => item.detailReplie().replyTo === tweetLiked.tweetLiked)
      if (likeReply) {
        likeReply.removeLikeReply(tweetLiked)
      }
    }
    else {
      console.log("Tweet ou curtida não encontrada")
    }
  }
}

export default new LikerController()