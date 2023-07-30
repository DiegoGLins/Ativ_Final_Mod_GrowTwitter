import { User } from "../models/UserModel";
import UserRepository from "../repositories/User.repository";

function validateUser(user: User): boolean {

    const email = UserRepository.getByEmail(user.email)
    const name = UserRepository.getByUserName(user.name)
    const username = UserRepository.getByUserName(user.username)

    if (!name || !email || !username) {
        return false
    }
    return true
}

export default validateUser