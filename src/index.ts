
import { TweetController } from "./controllers/TweetController";
import UserController from "./controllers/UserController";
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

console.log(`Usuario ${user1.name}`)

console.log("============ Usuario Jonh(user1) adicionando e removendo seguidores ==============")

user1.followingUser(user1.detailFollow()); //usuario Jonh tenta seguir a si mesmo
user1.followingUser(user2.detailFollow()); // usuario Jonh seguindo usuario Leila
user1.followingUser(user3.detailFollow()); // usuario Jonh seguindo usuario Alan
user1.unFollowingUser(user2.detailFollow()); //usuario Jonh deixando de seguir usuario Leila
console.log(user1.detailFollow())

console.log("==================================================================================")

console.log(`Usuario ${user2.name}`)

console.log("============= Usuario Leila(user2) adicionando e removendo seguidores ============")

user2.followingUser(user3.detailFollow()); // usuario Leila seguindo usuario Alan
user2.followingUser(user1.detailFollow()); // usuario Leila seguindo usuario jonh
user2.followingUser(user2.detailFollow()); // usuario Leila tenta seguir a si mesmo
console.log(user2.detailFollow())

console.log("==================================================================================")

console.log(`Usuario ${user3.name}`)

console.log("============= Usuario Alan(user3) adicionando e removendo seguidores =============")

user3.followingUser(user1.detailFollow()); // usuario Alan seguindo usuario Jonh
user3.followingUser(user1.detailFollow()); // usuario Alan seguindo usuario Jonh
user3.followingUser(user2.detailFollow()); // usuario Alan seguindo usuario Leila
user3.unFollowingUser(user2.detailFollow()); //usuario Alan deixou de seguir usuario Leila
user3.unFollowingUser(user2.detailFollow()); //usuario Alan deixou de seguir usuario Leila novamente e retorna alerta
console.log(user3.detailFollow())

console.log("==================================================================================")

console.log("=============== Instanciando um tweet para o usuario Leila(user2) ================")
const tweetA = new Tweet("A Growdev é show :)", user2)
console.log("==================================================================================")

console.log("========== Criando o tweet do usuario Leila(user2) com o TweetController =========")
new TweetController().create(tweetA)


console.log("==================================================================================")
console.log(`Usuario ${tweetA.author?.name}`)
console.log("==================================================================================")
console.log(user2.detailFollow())

console.log("==================================================================================")

console.log("= Instanciando um tweet reply do usuario Jonh(user1) para o tweet de Leila(user2)=")
const tweetC = new Tweet("Também gosto da Growdev", user1,tweetA)
console.log("==================================================================================")

console.log("======= Criando o tweet reply do usuario Jonh(user1) com o TweetController =======")
new TweetController().create(tweetC)


console.log("==================================================================================")
console.log(`Usuario ${tweetC.author?.name}`)
console.log("==================================================================================")
console.log(user1.detailFollow())

console.log("==================================================================================")

console.log("======== Instanciando um tweet para o usuario Alan(user3) ========================")
const tweetB = new Tweet("Bora Growdevers", user3)
console.log("==================================================================================")

console.log("= Instanciando um tweet reply do usuario Alan(user3) para o tweet de Jonh(user1) =")
const tweetD = new Tweet("Consegui evoluir bastante com a Growdev", user3,tweetC)
console.log("==================================================================================")

console.log("========== Criando o tweet do usuario Alan(user3) com o TweetController ==========")
new TweetController().create(tweetB)
console.log("==================================================================================")

console.log("=== Criando o tweetD reply do usuario Alan(user3) para o tweetC de Jonh(user1) ===")
new TweetController().create(tweetD)


console.log("==================================================================================")
console.log(`Usuario ${tweetB.author?.name}`)
console.log("==================================================================================")
console.log(user3.detailFollow())

console.log("==================================================================================")

console.log("========== Usuario Jonh(user1) curtindo tweetD de usuario Alan(user3) ============")
// // const liked1 = tweetA.addTweetliked(tweetA)
// console.log(liked1)


console.log("=========================== Usuario Alan(user3) ==================================")
console.log(user3.detailFollow())

console.log("=========================== Usuario Jonh(user1) ==================================")
console.log(user1.detailFollow())

// const liked
// console.log(liked)



// const list = new TweetController().listAllTweets()
// console.log(list)


// // const result = tweet1.displayTweet()
// // // console.log(user2.detailFollow())
// // console.log(result)



// // console.log(`Usuario ${tweet2.author.name}`)
// // new TweetController().create(tweet2)
// // console.log(user1.detailFollow())



// // const detailUser = user1.detailFollow()

// // const allTweets = detailUser.tweets.map(item=> {
// //    const info = item.displayTweet()
// //    return {info, autor: item.author}
// // })
// // const parse = JSON.stringify(allTweets)
// // console.log(`id: ${detailUser.id}`)
// // console.log(`name: ${detailUser.name}`)
// // console.log(`username: ${detailUser.username}`)
// // console.log(`tweets: ${JSON.parse(parse)}`)
// // console.log(detailUser, allTweets)