class UserManager {
    static #users = []
    create(data){
        try {
            if (!data.email) {
                const error = new Error ('Enter a valid email');
                throw error;
            } else if (!data.password) {
                const error = new Error ('Enter a valid password');
                throw error;
            } else {
                const user = {
                    id: UserManager.#users.length === 0
                        ? 1
                        : UserManager.#users[UserManager.#users.length-1].id+1,
                    email: data.email,
                    password: data.password,
                    photo: data.photo || './assets/imgpath.jpg',
                    role: data.role || 'TBD'
                };
                UserManager.#users.push(user);
                console.log('User successfully created')
            };
        } catch(err) {
            throw(err)
        };
    };
    read() {
        try {
            console.log(UserManager.#users);
        } catch(err) {
            console.log('Unable to find the users');
        };       
    };
    readOne(id) {
        try {
            let allUsers = UserManager.#users;
            let selected = allUsers.find((each) => each.id === id);
            if (!selected) {
                throw new Error ('No user found with the specified ID. Please check the ID and try again.')
            } else {
                console.log(selected);
            };
        } catch(err) {
            console.log(err)
        };
    };
    destroy(id) {
        try {
            let allUsers = UserManager.#users;
            let withoutSelected = allUsers.filter((each) => each.id !== id);
            if (allUsers.length == withoutSelected.length) {
                throw new Error ('No product found with the specified ID. Please check the ID and try again.');
            } else {
                UserManager.#users = withoutSelected;
                console.log('User deleted')
                console.log(UserManager.#users)
            };
        } catch(err) {
            console.log(err)
        };
    };
};

const users = new UserManager()

users.create({
    photo: './assets/imgpath.jpg',
    email: 'johndoe123@email.com',
    password: 'P@ssw0rd123',
    role: 'Customer Service Representative'
})

users.create({
    photo: './assets/imgpath.jpg',
    email: 'sarahsmith456@email.com',
    password: 'SecurePass789!',
    role: 'Sales Associate'
})

users.create({
    photo: './assets/imgpath.jpg',
    email: 'lisawilliams432@email.com',
    password: 'William$L1sa',
    role: 'Customer Support Specialist'
})

users.create({
    photo: './assets/imgpath.jpg',
    email: 'emilybrown321@email.com',
    password: 'Brownie1234$',
    role: 'Customer Support Specialist'
})

users.create({
    photo: './assets/imgpath.jpg',
    email: 'mikejones789@email.com',
    password: '2335$$w0rd',
    role: 'Marketing Coordinator'
})

users.create({
    photo: './assets/imgpath.jpg',
    email: 'davidwilson987@email.com',
    password: 'WilsonD@v3',
    role: 'Sales Associate'
})

users.create({
    photo: './assets/imgpath.jpg',
    email: 'laurajackson654@email.com',
    password: 'JackL@ura1',
    role: 'Marketing Coordinator'
})

users.create({
    photo: './assets/imgpath.jpg',
    email: 'chrisroberts234@email.com',
    password: 'CR1234$ecure',
    role: 'Customer Service Representative'
})

users.create({
    photo: './assets/imgpath.jpg',
    email: 'kevinharris876@email.com',
    password: 'HarrisK3vin!',
    role: 'Sales Associate'
})

users.create({
    photo: './assets/imgpath.jpg',
    email: 'alexmiller890@email.com',
    password: 'MillerAlex789',
    role: 'Marketing Coordinator'
})


//TESTING

//users.read()
//users.readOne()
//users.destroy()







