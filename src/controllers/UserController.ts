

import { users } from "../database/users";
import validateUser from "../middlewares/UserMiddleware";
import { User } from "../models/UserModel";

class UserController {
  public registerUser(user: User) {
    const validate = validateUser(user)
    if (!validate) {
      console.log("Dados inválidos");
      return false
    }
    {
      const newUser = new User(user.name, user.username, user.email, user.password)
      users.push(newUser);
      console.log(`Usuario ${newUser.username} cadastrado com sucesso`)
      return newUser.detailUserRegister()
    }
  }
  public listUsers() {
    const allusers = users.map(item => item.detailFollow())
    return allusers
  }


}

export default new UserController();
