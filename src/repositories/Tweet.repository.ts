
import { tweets } from "../database/tweets";
import { users } from "../database/users";
import { Reply } from "../models/ReplyModel";
import Tweet from "../models/TweetModel";
import { User } from "../models/UserModel";
import { v4 as createUuid } from 'uuid'
export class TweetRepository {
  public addTweet(tipo: Tweet) {
    tweets.push(tipo);
  }

  public list(params: User) {

    const findUser = users.find(item => item.id === params.id)

    if (findUser) {
      const listTweets = findUser!.tweets.map(item => {item.content})
      return listTweets
    }
  }


  public getId(id: string) {
    return tweets.find((tweet) => tweet.getId() === id)
  }

  public getIndex(id: string) {
    return tweets.findIndex((tweet) => tweet.getId() === id)
  }

  public delete(index: number) {
    tweets.splice(index, 1)
  }

}

export default new TweetRepository()