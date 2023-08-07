import { v4 as createUuid } from "uuid";
import { TweetType } from "../Types/TweetType";
import { Liker } from "./LikerModel";
import { Reply } from "./ReplyModel";
import { User } from "./UserModel";


class Tweet {
  private id: string;
  public likes: Liker[];
  public replies: Reply[];
  public tipo: TweetType.normal
  public content: string

  constructor(content: string, public author: User) {
    this.content = content
    this.id = createUuid();
    this.author = author;
    this.likes = [];
    this.replies = [];
    this.tipo = TweetType.normal;
  }

  public getId() {
    return this.id;
  }

  //----- Inclui e remove e likes ------

  public includeLike(tweet: Liker) {
    this.likes.push(tweet)
  }

  public removeLike(likeId: Liker) {
    const index = this.likes.findIndex(item => item.likedId === likeId.likedId)
    if (index !== -1) {
      this.likes.splice(index, 1)
    }
  }


  detailTweet() {
  
    return {
      author: this.author.username,
      content: this.content,
      likes: this.likes.length,
      reply: this.replies.length
    }
  }
}


export default Tweet