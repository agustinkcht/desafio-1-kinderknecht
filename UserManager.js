class UserManager {
    static #users = []
    create(data){
        const user = {
            id: UserManager.#users.length === 0
                ? 1
                : UserManager.#users[UserManager.#users.length-1].id+1,
            email: data.email,
            password: data.password,
            photo: data.photo,
            role: 0
        }
        UserManager.#users.push(user);
        console.log('Usuario Creado')
    }
    read(){
        return UserManager.#users
    }
}

const users = new UserManager()

users.create({
    photo: 'pictureOfMine.jpg',
    email: 'paulluap@gmail.com',
    password: 'abcd1234'
})

users.create({
    photo: 'myphoto.png',
    email: 'charlomagne@gmail.com',
    password: '1234abcd'
})

console.log(users.read())






