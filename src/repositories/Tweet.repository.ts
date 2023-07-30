
import { tweets } from "../database/tweets";
import { users } from "../database/users";
import Tweet from "../models/TweetModel";



class TweetRepository {
  public addTweet(tipo: Tweet) {
    tweets.push(tipo);
  }

  public list(params: Tweet) {
    return tweets.filter(item => item.author.id === params.getId());
  }

  public addReply(tweet: Tweet) {
    users.find(item => item.detailFollow().tweets.push(tweet))
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

export default new TweetRepository;
