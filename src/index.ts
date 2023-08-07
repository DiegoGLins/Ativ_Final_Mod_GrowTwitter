
import LikerController from "./controllers/LikerController";
import ReplyController from "./controllers/ReplyController";
import TweetController from "./controllers/TweetController";
import UserController from "./controllers/UserController";
import { Reply } from "./models/ReplyModel";
import Tweet from "./models/TweetModel";
import { User } from "./models/UserModel";

console.log("========================= Instanciando os usuarios ===============================")

const user1 = new User("Jonh", "JonhMaster", "jonh@jonh.com", "12345");
const user2 = new User("Leila", "leiloca", "leiloca@leiloca.com", "12345");
const user3 = new User("Alan", "Alan4569", "alan@alan.com", "12345");

console.log("================== cadastrando usuarios com o UserController =====================")

UserController.registerUser(user1);

console.log(user1.detailUserRegister())
console.log("==================================================================================")
UserController.registerUser(user2);
console.log(user2.detailUserRegister())
console.log("==================================================================================")
UserController.registerUser(user3);
console.log(user3.detailUserRegister())
console.log("==================================================================================")

console.log("==================================================================================")

console.log("=============== Instanciando um tweet para o usuario Leila(user2) ================")
const tweetA = new Tweet("A Growdev é show :)", user2)
console.log("==================================================================================")

console.log("========== Criando o tweet do usuario Leila(user2) com o TweetController =========")
const createTweetA = TweetController.create(tweetA, user2)
console.log(createTweetA)

console.log("==================================================================================")
console.log(`Usuario ${tweetA.author.username}`)
console.log("==================================================================================")
console.log(user2)

console.log("==================================================================================")

console.log("============== Instanciando um tweet para o usuario Alan(user3) ==================")
const tweetB = new Tweet("Bora Growdevers", user3)
console.log("==================================================================================")

console.log("=========== Criando o tweet do usuario Alan(user3) com o TweetController =========")
const createTweetB = TweetController.create(tweetB, user3)
console.log(createTweetB)

console.log("==================================================================================")
console.log(`Usuario ${tweetB.author.username}`)
console.log("==================================================================================")
console.log(user3)

console.log("==================================================================================")

console.log("================ Instanciando um tweet para o usuario Jonh(user1) ================")
const tweetC = new Tweet("Aprendi nessa plataforma com a Growdev", user1)
console.log("==================================================================================")

console.log("=========== Criando o tweet do usuario Jonh(user1) com o TweetController =========")
const createTweetC = TweetController.create(tweetC, user1)
console.log(createTweetC)

console.log("==================================================================================")
console.log(`Usuario ${tweetC.author.username}`)
console.log("==================================================================================")
console.log(user1)

console.log("==================================================================================")

console.log("= Instanciando um tweet reply do usuario Alan(user3) para o tweet de Jonh(user1) =")
const tweetD = new Reply("Aprendi nessa plataforma com a Growdev", user1, user3, "Evolui muito com a Growdev")
console.log("==================================================================================")
console.log("====== Criando o tweet reply do usuario Alan(user3) com o ReplyController ========")

const createReplyD = ReplyController.createReply(user1, "Aprendi nessa plataforma com a Growdev",tweetD)
console.log(createReplyD)

console.log("= Instanciando um tweet reply do usuario Jonh(user1) para o tweet de Leila(user2) =")
const tweetE = new Reply("A Growdev é show :)", user2, user1, "Gosto do sistema de ensino da Growdev")
console.log("===================================================================================")
console.log("====== Criando o tweet reply do usuario Jonh(user1) com o ReplyController ========")

const createReplyE = ReplyController.createReply(user2, "A Growdev é show :)",tweetE)
console.log(createReplyE)

console.log("= Instanciando um tweet reply do usuario Alan(user3) para o tweet de Leila(user2) =")
const tweetF = new Reply("A Growdev é show :)", user2, user3, "Vamos decolar com a Growdev")
console.log("===================================================================================")
console.log("====== Criando o tweet reply do usuario Alan(user3) com o ReplyController ========")

const createReplyF = ReplyController.createReply(user2, "A Growdev é show :)",tweetF)
console.log(createReplyF)

console.log("=================== Usuario Jonh curte o tweet de usuario Leila ==================")

const liked1 = LikerController.addLike(user1, "A Growdev é show :)", user2)
console.log(liked1)

console.log("=================== Usuario Jonh curte o tweet de usuario Alan ===================")

const liked2 = LikerController.addLike(user1, "Evolui muito com a Growdev", user3)
console.log(liked2)
console.log("==================================================================================")

console.log("================== Usuario Alan curte o tweet de usuario Leila ===================")

const liked3 = LikerController.addLike(user3, "A Growdev é show :)", user2)
console.log(liked3)
console.log("==================================================================================")

console.log("================== Usuario Leila curte o tweet de usuario Jonh ===================")

const liked4 = LikerController.addLike(user2, "Aprendi nessa plataforma com a Growdev", user1)
console.log(liked4)
console.log("==================================================================================")


console.log(`Usuario ${user1.name}`)

console.log("============ Usuario Jonh(user1) adicionando e removendo seguidores ==============")

user1.followingUser(user1); //usuario Jonh tenta seguir a si mesmo
user1.followingUser(user2); // usuario Jonh seguindo usuario Leila
user1.followingUser(user3); // usuario Jonh seguindo usuario Alan
user1.unFollowingUser(user2); //usuario Jonh deixando de seguir usuario Leila
console.log(user1.detailFollow())

console.log("==================================================================================")

console.log(`Usuario ${user2.name}`)

console.log("============ Usuario Leila(user2) adicionando e removendo seguidores =============")

user2.followingUser(user3); // usuario Leila seguindo usuario Alan
user2.followingUser(user1); // usuario Leila seguindo usuario jonh
user2.followingUser(user2); // usuario Leila tenta seguir a si mesmo
console.log(user2.detailFollow())

console.log("==================================================================================")

console.log(`Usuario ${user3.name}`)

console.log("============= Usuario Alan(user3) adicionando e removendo seguidores =============")

user3.followingUser(user1); // usuario Alan seguindo usuario Jonh
user3.followingUser(user1); // usuario Alan seguindo usuario Jonh
user3.followingUser(user2); // usuario Alan seguindo usuario Leila
user3.unFollowingUser(user2); //usuario Alan deixou de seguir usuario Leila
user3.unFollowingUser(user2); //usuario Alan deixou de seguir usuario Leila novamente e retorna alerta
console.log(user3.detailFollow())



console.log(`===================== Feed do usuario ${user2.name} ==============================`)
TweetController.feedTweet("A Growdev é show :)", user2)

console.log("-------------------------------------------------------------------------")

console.log(`===================== Feed do usuario ${user3.name} ==============================`)
TweetController.feedTweet("Bora Growdevers", user3)
TweetController.feedTweet("Evolui muito com a Growdev", user3)

console.log("-------------------------------------------------------------------------")


console.log(`==================== Feed do usuario ${user1.name} ===============================`)
TweetController.feedTweet("Aprendi nessa plataforma com a Growdev", user1)

console.log("-------------------------------------------------------------------------")
console.log(`===================== Feed do usuario ${user2.name} ==============================`)
const feedUser2 = user2.showFeed()
console.log(feedUser2)
