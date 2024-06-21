import fs from "fs";
import crypto from "crypto";

class UserManager {
    constructor() {
        this.path = './src/DAO/fs/files/users.json'
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
                    photo: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
                    email: data.email,
                    password: data.password,
                    role: data.role || '0'
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
            throw err;
        };
    };
    async read(role = null) {
        try {
            let allUsers = await fs.promises.readFile(this.path, 'utf-8');
            allUsers = JSON.parse(allUsers);
            if (role) {
                allUsers = allUsers.filter(each => each.role === role);
            };
            if (allUsers.length === 0) {
                return null;
            };
            console.log(allUsers);
            return allUsers; 
        } catch(err) {
            throw err;
        };
    };
    async readOne(id) {
        try {
            let allUsers = await fs.promises.readFile(this.path, 'utf-8');
            allUsers = JSON.parse(allUsers);
            let selected = allUsers.find(each => each.id === id);
            if (selected) {
                console.log(selected);
                return selected;
            } else {
                const error = new Error ('No user found with the specified ID. Please check the ID and try again.');
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            throw err;
        };
    };
    async destroy(id) {
        try {
            let allUsers = await fs.promises.readFile(this.path, 'utf-8');
            allUsers = JSON.parse(allUsers);
            let selected = allUsers.find(each => each.id === id);
            if (selected) {
                let withoutSelected = allUsers.filter(each => each.id !== id);
                withoutSelected = JSON.stringify(withoutSelected, null, 4);
                await fs.promises.writeFile(this.path, withoutSelected);
                console.log('The user has been successfully deleted');
                console.log(selected);
                return selected;
            } else {
                const error = new Error ('No user found with the specified ID. Please check the ID and try again.');
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            throw err;
        };
    };
    async update(id, data) {
        try {
            let allUsers = await this.read();
            let selected = allUsers.find(each => each.id === id);
            if (selected) {
                for(let prop in data) {
                    selected[prop] = data[prop];
                };
                allUsers = JSON.stringify(allUsers, null, 4);
                await fs.promises.writeFile(this.path, allUsers);
                console.log('The user data has been updated successfully')
                console.log(selected);
                return selected;
            } else {
                const error = new Error ('No user found with the specified ID. Please check the ID and try again.');
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            throw err;
        };
    };
};

const userManager = new UserManager()
export default userManager
