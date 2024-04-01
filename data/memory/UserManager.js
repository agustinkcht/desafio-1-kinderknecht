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
                    role: data.role || '0'
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
    role: 0
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'sarahsmith456@email.com',
    password: 'SecurePass789!',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'lisawilliams432@email.com',
    password: 'William$L1sa',
    role: 0
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'emilybrown321@email.com',
    password: 'Brownie1234$',
    role: 0
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'mikejones789@email.com',
    password: '2335$$w0rd',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'davidwilson987@email.com',
    password: 'WilsonD@v3',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'laurajackson654@email.com',
    password: 'JackL@ura1',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'chrisroberts234@email.com',
    password: 'CR1234$ecure',
    role: 0
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'kevinharris876@email.com',
    password: 'HarrisK3vin!',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'alexmiller890@email.com',
    password: 'MillerAlex789',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'markthompson123@email.com',
    password: 'M@rkTh0mp!234',
    role: 0
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'jessicablake456@email.com',
    password: 'Bl@keJ3ss!789',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'matthewdavis432@email.com',
    password: 'Dav!sM@tth3w1',
    role: 0
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'ashleyharrison321@email.com',
    password: 'H@rr!s0nAs!ey321',
    role: 0
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'nathanrobinson789@email.com',
    password: 'R0b!nsonN@th@n789',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'oliviataylor987@email.com',
    password: 'T@yl0r0l!v!a987',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'danielcooper654@email.com',
    password: 'Coop3rD@niel654',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'meganturner234@email.com',
    password: 'Turn3rMeg@n234',
    role: 0
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'lukepeterson876@email.com',
    password: 'P3t3rs0nLuk3!876',
    role: 1
});

users.create({
    photo: './assets/imgpath.jpg',
    email: 'samanthajenkins890@email.com',
    password: 'J3nk!nsS@m@nth@890',
    role: 1
});



//TESTING

//users.read()
//users.readOne()
//users.destroy()







