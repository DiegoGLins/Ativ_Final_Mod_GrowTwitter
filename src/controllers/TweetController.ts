
import { Follow } from "../Types/FollowUserType";
import { TweetType } from "../Types/TweetType";
import { tweets } from "../database/tweets";
import Tweet from "../models/TweetModel";
import { User } from "../models/UserModel";
import TweetRepository from "../repositories/Tweet.repository";

export class TweetController {
  public create(tweet: Tweet, TweetReplyTo?: Tweet) {
    let newTweet = new Tweet(tweet.content, tweet.author, TweetReplyTo);

    if (!TweetReplyTo) {
      TweetRepository.addTweet(tweet)
      newTweet.author.tweets.push(tweet)
      return newTweet
    }

    {
      const createReply = (tweet: Tweet, TweetReplyTo?: Tweet) => {
        let newTweet = new Tweet(tweet.content, tweet.author, TweetReplyTo);
        const allTweetsUser = tweet.author.tweets.map(item => item)
        if (allTweetsUser.find(item => item.getId()) === tweets.find(item => item.getId())) {

          let TweetReplyTo = newTweet

          if (newTweet.tipo === TweetType.reply) {
            const tweetIdReply = newTweet.getId()
            const tweetToReply = TweetRepository.getId(tweetIdReply);
            TweetRepository.addReply(tweetToReply)
            TweetRepository.addTweet(tweetToReply)
            return console.log(`${newTweet.author.username} respondeu ao tweet de ${TweetReplyTo.author.username}`)
          }
        }
        else {
          return
        }
      }
      createReply(newTweet)
    }
  }

  // public liker(findAuthorLiked: Tweet) {
  //   const tweetliked = new Tweet(findAuthorLiked.content,findAuthorLiked.author)
  //   tweetliked.addTweetliked(tweetliked)
  // }

  public listAllTweets() {
    const info = tweets.map(item => item.displayTweet())
    return info
  }
}




  // export class TweetController {
  //   // tweet sem id = não existe. Se não existe é normal se não é reply
  //   public create(tweet: Tweet) {

  //     const newTweet = new Tweet(tweet.detailTweet().id,tweet.detailTweet().author,tweet.detailTweet().addressee);
  //     const info = {name: newTweet.detailTweet().author.name,username: newTweet.detailTweet().author.username,email: newTweet.detailTweet().author.email};

  //       if (userSearchTweet?.detailFollow().email === info.email) {
  //        newTweet.tipo = TweetType.reply
  //        tweet.incrementReply()
  //         return info;
  //       }

  //       if (newTweet.tipo === TweetType.reply) {
  //         const tweetIdToReply = newTweet.getId();
  //         const tweetToReply = TweetRepository.get(tweetIdToReply);
  //         tweet.incrementReply()
  //         if (!tweetToReply) {
  //           return console.log("Tweet para responder não encontrado.");
  //         }

  //         newTweet.tipo = TweetType.reply;
  //         tweet.incrementReply
  //         TweetRepository.addTweet(newTweet);
  //         return console.log(`@${tweet.detailTweet().author.username} respondeu ao tweet: ${info}`);
  //       } else {
  //         TweetRepository.addTweet(newTweet);
  //         newTweet.tipo = TweetType.normal
  //         console.log(`@${tweet.detailTweet().author.username}criou o tweet: ${newTweet.detailTweet()}`
  //         );
  //       }
  //   }

  // }

