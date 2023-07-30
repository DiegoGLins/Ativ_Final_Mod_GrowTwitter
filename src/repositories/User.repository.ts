import { users } from "../database/users";


class UserRepository {

    public getId(id: string) {
        return users.find(item=> item.id === id)
    }

    public getByEmail(email: string) {
        return users.find(item=> item.email === email)
    }

    public getByUserName(username: string) {
        return users.find(item => item.username = username)
    }
}

export default new UserRepository;