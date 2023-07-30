import { v4 as createUuid } from "uuid";
import { TweetType } from "../Types/TweetType";
import { users } from "../database/users";
import { Follow } from "../Types/FollowUserType";
import { Liker } from "./LikerModel";


// export class Tweet {
//   private id: string;
//   public tipo: TweetType.normal | TweetType.reply;
//   public likes: number;
//   public reply: number;

//   constructor(
//     public content: string,
//     private author: Follow,
//     private addressee: Follow
//   ) {
//     this.id = createUuid();
//     this.tipo = TweetType.normal || TweetType.reply;
//     this.likes = 0;
//     this.reply = 0;
//   }

//   public getId() {
//     return this.id;
//   }

//   public addlike() {
//     return this.likes++
//   }

//   public unLike() {
//     return this.likes--
//   }

//   public incrementReply() {
//     this.reply++
//   }

//   public detailTweet() {
//     return {
//       id: this.id,
//       author: this.author,
//       addressee: this.addressee,
//       content: this.content,
//       likes: this.likes,
//       reply: this.reply,
//     };
//   }

//   public detailAuthor() {
//     const autor = users.find((item) => item.detailFollow().id === this.getId());

//     const detail = autor?.detailFollow()
//     return detail?.tweets
//   }
// }
class Tweet {
  private id: string;
  private likes: number;
  private replies: number;
  public tipo: TweetType.normal | TweetType.reply;

  // database Tweets = [] = tweet1 + tweet2 + tweet3 + tweet4

  //tweet 1 -- leila - normal - id: 46323661 (tweet primario(original)) - undefined

  //tweet 2 -- Alan - reply do tweet 1 - id: 5653133
  //tweet 3 --- Jonh - normal - id: 4217998
  //tweet 4 -- leia - reply do tweet 3 - id: 6497851

  //tweet2 => tweet reply => leila

  constructor(
    public content: string,
    public author: Follow,
    private replyTo?: Tweet
  ) {
    this.id = createUuid();
    this.author = author;
    this.likes = 0;
    this.replies = 0;
    this.tipo = !replyTo ? TweetType.normal : TweetType.reply
  }

  public getId() {
    return this.id;
  }

  public getReplyCount() {
    return this.replies
  }

  public getLikesCount() {
    return this.likes
  }

  public detailAuthor() {
    const detail = {
      id: this.author.id,
      username: this.author.username,
      email: this.author.email
    }
    return detail
  }

  public addTweetliked(tweet: Liker) {
    this.author.tweets.push(tweet.tweetLiked)
    this.likes++
    return this.displayTweet(tweet)
  }


  public displayTweet(tweet: Liker) {
    const author = tweet.authorlike.username
    const content = this.content;
    const likes = this.getLikesCount();
    const replies = this.replies

    let likeString = tweet.tweetLiked.content
    if (likes === 1) {
      return likeString = `@${author} curtiu isso`;
    } else if (likes >= 2) {
      console.log(likeString)
      return likeString = `@${author} e mais ${likes} usuários curtiram`
    }

    let replyString = tweet.tweetLiked.content
    if (replies > 0) {
      return replyString = this.getReplyString();
    }

    return console.log(`@${author}: ${content} \n ${likeString} \n  ${replyString}`)
  }

  private getReplyString() {
    let replyString = ''
    for (const reply of this.author.tweets) {
      const author = reply.author.username;
      const content = reply.content;
      const likes = reply.likes;
      const replies = reply.replies
      return replyString += `> @${author}: ${content}\n ${likes} \n ${replies}`;
    }
    return replyString
  }
}


export default Tweet