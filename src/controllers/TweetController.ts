
import Tweet from "../models/TweetModel";
import { users } from "../database/users";
import TweetRepository from "../repositories/Tweet.repository";
import { User } from "../models/UserModel";
import { tweets } from "../database/tweets";
import { replies } from "../database/replies";
import { Follow } from "../Types/FollowUserType";
import { Reply } from "../models/ReplyModel";


class TweetController {
  public create(content: Tweet, authorId: User) {

    const findUser = users.find(item => item.id === authorId.id)
    const newTweet = new Tweet(content.content, authorId)
    newTweet.tipo
    TweetRepository.addTweet(newTweet)
    findUser?.tweets.push(newTweet)
    tweets.push(newTweet)
    return newTweet
  }


  public feedTweet(tweet: string, user: Follow) {

    // const findUser = users!.find(item => item.id === user.id)

    const findTweet = tweets.find(item => item.content === tweet)
    const findReply = replies.find(item => item.authorReply.id === user.id)


    if (findTweet) {
      if (findTweet?.likes.length === 0) {
        console.log(`@${user.username} : ${findTweet?.content}`)
        console.log(`[ ${findTweet.likes.length} curtidas ]`)
        console.log("=========================================================================")
      }

      if (findTweet!.likes.length === 1) {
        console.log(`@${findTweet?.author.username} : ${findTweet?.content}`)
        console.log(`[ @${findTweet!.likes.map(item => item.authorlike.username)} curtiu isso ]`)
        console.log("=========================================================================")

      }

      if (findTweet!.likes.length >= 2) {
        console.log(`@${findTweet?.author.username} : ${findTweet?.content} `)
        console.log(`[ @${findTweet!.likes[0].authorlike.username} e mais ${findTweet?.likes.length - 1} curtiram ]`)
        console.log("=========================================================================")
      }

      if (findTweet) {
        if (findTweet.replies.length) {
          console.log(`@${findTweet.author.username} : ${findTweet.content}`)
          console.log(`> @${findTweet.replies.find(item => item.authorReply.username)}: ${findTweet.replies.find(item => item.contentTweetReply)}\n likes: ${findTweet.replies.find(item => item.likes.length)}`)
          console.log("=========================================================================")
        }
      }
    }


    if (findReply) {
      if (findReply.likes.length === 0) {
        console.log(`@${findReply.authorTweet.username} : ${findReply!.contentTweetReply}`)
        console.log(`[ ${findReply.likes.length} curtidas ]`)
        console.log("=========================================================================")
      }

      else if (findReply.likes.length === 1) {
        console.log(`@${findReply.authorTweet.username} : ${findReply!.contentTweetReply}`)
        console.log(`[ @${findReply!.likes.map(item => item.authorlike.username)} curtiu isso ]`)
        console.log("=========================================================================")
      }

      else if (findReply.likes.length >= 2) {
        console.log(`@${findReply.authorTweet.username} : ${findReply!.contentTweetReply} `)
        console.log(`[ @${findReply!.likes[0].authorlike.username} e outros ${findReply!.likes.length - 1} curtiram ]`)
        console.log("=========================================================================")
      }
    }

    if (findReply) {
      for (const reply of replies) {
        const authorTweet = reply.authorReply.username
        const contentTweet = reply.replyTo
        const authorReply = reply.authorTweet.username
        const content = reply.contentTweetReply
        const likes = reply.likes.length
        console.log(`@${authorTweet} : ${contentTweet}`)
        console.log(`> @${authorReply}: ${content}\n [ ${likes} likes ] \n [ ${replies.length - 1} replies ]`)
        console.log("=========================================================================")
      }
    }
  }
}



export default new TweetController()


