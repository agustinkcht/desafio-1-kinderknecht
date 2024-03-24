const fs = require('fs')
const crypto = require('crypto')

class UserManager {
    constructor() {
        this.path = '../files/users.json'
        this.init()
    };
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const initData = JSON.stringify([], null, 4);
            fs.writeFileSync(this.path, initData);
            console.log('File created')
        } else {
            console.log('File located')
        };
    };
    async create(data) {
        try {
            if (!data.email) {
                const error = new Error ('Enter a valid email');
                throw error;
            } else if (!data.password) {
                const error = new Error ('Enter a valid password');
                throw error;
            } else {
                const user = {
                    id: crypto.randomBytes(12).toString('hex'),
                    photo: './assets/imgpath.jpg',
                    email: data.email,
                    password: data.password,
                    role: data.role || 'TBD'
                };
                let allUsers = await fs.promises.readFile(this.path, 'utf-8');
                    allUsers = JSON.parse(allUsers);
                    allUsers.push(user);
                    allUsers = JSON.stringify(allUsers, null, 4);
                    await fs.promises.writeFile(this.path, allUsers);
                    console.log('User created successfully');
                    return user;
            };

        } catch(err) {
            throw(err)
        };
    };
    async read() {
        try {
            let allUsers = await fs.promises.readFile(this.path, 'utf-8');
            allUsers = JSON.parse(allUsers);
            console.log(allUsers)
        } catch(err) {
            console.log('Unable to find the users')
        };
    };
    async readOne(id) {
        try {
            let allUsers = await fs.promises.readFile(this.path, 'utf-8');
            allUsers = JSON.parse(allUsers);
            let selected = allUsers.find((each) => each.id === id);
            if (!selected) {
                throw new Error ('No user found with the specified ID. Please check the ID and try again.');
            } else {
                console.log(selected)
                return selected;
            }
        } catch(err) {
            throw(err)
        };
    };
    async destroy(id) {
        try {
            let allUsers = await fs.promises.readFile(this.path, 'utf-8');
            allUsers = JSON.parse(allUsers);
            let selected = allUsers.find((each) => each.id === id);
            if (!selected) {
                throw new Error('No user found with the specified ID. Please check the ID and try again.');
            } else {
                let withoutSelected = allUsers.filter((each) => each.id !== id)
                withoutSelected = JSON.stringify(withoutSelected, null, 4);
                await fs.promises.writeFile(this.path, withoutSelected);
                console.log('The user has been successfully deleted');
                console.log(withoutSelected);
                return withoutSelected;
            };
        } catch(err) {
            throw(err)
        };
    };
};


//TESTING

async function test() {
    try {
        const users = new UserManager();
        // users.create({})
        // users.read()
        // users.readOne()
        // users.destroy()

    } catch(err) {
        console.log(err)
    };
};

// test()