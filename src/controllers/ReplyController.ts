import { Follow } from "../Types/FollowUserType";
import { TweetType } from "../Types/TweetType";
import { replies } from "../database/replies";
import { users } from "../database/users";
import { Reply } from "../models/ReplyModel";
import Tweet from "../models/TweetModel";
import { User } from "../models/UserModel";


class ReplyController {

    public createReply(authorTweet: User, replyTo: string, tweetReply: Reply) {

        let newReply = new Reply(replyTo, tweetReply.authorReply, authorTweet, tweetReply.contentTweetReply)

        const findAuthor = users.find(item => item.id === tweetReply.authorReply.id)
        findAuthor?.tweets.find(item => item.replies.push(newReply))

        const findTweet = authorTweet.tweets.find(item => item.content === replyTo)

        
        if (findTweet) {
            tweetReply.authorReply.tweets.push(findTweet)
        }


        findTweet?.replies.push(newReply)
        authorTweet.replie.push(newReply)

        replies.push(newReply)
        const info = {
            tweetOriginal: `@${authorTweet.username} : ${replyTo}`,
            reply: `> @${tweetReply.authorReply.username} : ${tweetReply.contentTweetReply}`,
        }
        return info
        // }
        // }
    }

    public removeReply(tweet: Reply) {
        const findUser = users.find(item => item.id === tweet.authorReply.id)
        const findTweet = findUser!.detailFollow().tweets.map(item => item.replies)
        const index = findTweet.findIndex(item => item.findIndex(item => item.getIdReply() === tweet.getIdReply()))

        if (index !== -1) {
            findTweet.slice(index, 1)
            console.log("Tweet reply exluido com sucesso")
        }
        else {
            console.log("Tweet reply não encontrado")
        }
    }
}

export default new ReplyController()

