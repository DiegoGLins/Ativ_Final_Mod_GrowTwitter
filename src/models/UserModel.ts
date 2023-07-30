import { v4 as createUuid } from "uuid";
import { Follow } from "../Types/FollowUserType";
import { tweets } from "../database/tweets";
import TweetRepository from "../repositories/Tweet.repository";
import Tweet from "./TweetModel";
import { Liker } from "./LikerModel";

export class User implements Follow{
  private _id: string;
  public numberFollowing: number;
  public following: Follow[];
  public tweets: Tweet[]

  constructor(
    public name: string,
    public username: string,
    public email: string,
    private _password: string
  ) {
    this._id = createUuid()
    this.username = username;
    this._password = _password;
    this.following = [];
    this.numberFollowing = this.following.length;
    this.tweets = []
  }

  //------ getters------

  public get id(): string {
    return this._id;
  }

  public getPassword(): string {
    return this.password;
  }

  //------ setters --------

  public setId(id: string) {
    this._id = id;
  }

  public set password(password: string) {
    this._password = password;
  }

  //---- Detalhe do usuario cadastrado-----//

  public detailUserRegister() {
    return {
      id: this._id,
      name: this.name,
      username: this.username,
      email: this.email
    }
  }

  // -------- Detalhe do seguidor ---------//

  public detailFollow() {
    const listTweets = tweets.filter((tweet) => tweet.author.id === this.id)

    return {
      id: this._id,
      name: this.name,
      username: this.username,
      email: this.email,
      numberFollowing: this.numberFollowing,
      tweets: listTweets,
    };
  }

  //--- Seguindo e deixar de seguir ---//

  public addFollowing(user: Follow) {
    this.following.push(user);
    return this.numberFollowing++;
  }

  public unFollowing(user: Follow) {
    const index = this.following.findIndex((item) => item.id === user.id);
    this.following.splice(index, 1);
    return this.numberFollowing--;
  }

  //---------- Curtindo um tweet ----------//

  // public addLike(tweet: Tweet) {
  //   const tweetLiked = tweet.addTweetliked()
  //   console.log(tweetLiked)
  //   return tweetLiked
  // }

  //---------- Removendo a curtida ----------//

  public removeLike(tweet: Tweet) {
    const tweetUnlikeContent = tweet.content;
    const tweetUnlike = tweet;
    if (!tweetUnlike) {
      return console.log("Tweet não encontrado");
    }
    return tweetUnlikeContent
  }

  //----------- Seguindo -----------//

  public followingUser(user: Follow) {
    if (user === undefined) {
      console.log("Usuario precisa ser diferente de vazio");
      return;
    }

    if (this._id === user.id) {
      console.log("Você não pode seguir a si mesmo!");
      return;
    }

    const alreadyFollowing = this.following.some((item) => item.id === user.id);
    if (alreadyFollowing) {
      console.log(`@${this.username}, você já está seguindo o usuario @${user.username}`);
      return;
    }

    this.addFollowing(user);
    console.log(`@${this.username} começou seguir @${user.username}`);
    this.detailFollow();
  }

  public unFollowingUser(user: Follow) {
    if (user === undefined) {
      console.log("Usuario precisa ser diferente de vazio");
      return;
    }

    if (this.detailFollow().id === user.id) {
      console.log("Você não pode deixar de seguir a si mesmo!");
      return;
    }

    const isFollowing = this.following.some((item) => item.id === user.id);
    if (!isFollowing) {
      console.log(`@${user.username} não faz parte da lista que você segue`);
      return;
    }

    this.unFollowing(user);
    console.log(`@${this.username} deixou de seguir @${user.username} `);
    return this.detailFollow();
  }

  //--- Feed de tweets do usuario ---//

  public displayFeed(tweets: Tweet) {
    const feed = TweetRepository.list(tweets)
    return feed;
  }

}
