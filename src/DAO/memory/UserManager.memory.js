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
                    photo: data.photo || 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
                    role: data.role || '0'
                };
                UserManager.#users.push(user);
                console.log('User successfully created')
            };
        } catch(err) {
            throw(err)
        };
    };
    read(role) {
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
    update(id, data) {
        try {
            let allUsers = UserManager.#users;
            let selected = allUsers.find(each => each.id === id);
            if (selected) {
                for (let prop in data) {
                    selected[prop] = data[prop];
                };
                UserManager.#users.push(selected);
                console.log('The user data has been updated successfully');
                console.log(selected);
                return selected;
            } else {
                const error = new Error('No user found with the specified ID. Please check the ID and try again.')
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            console.log(err);
        };
    };
};

const userManager = new UserManager()

userManager.create({
    photo: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
    email: 'johndoe123@email.com',
    password: 'P@ssw0rd123',
    role: 0
});

userManager.create({
    photo: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
    email: 'sarahsmith456@email.com',
    password: 'SecurePass789!',
    role: 1
});

userManager.create({
    photo: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
    email: 'lisawilliams432@email.com',
    password: 'William$L1sa',
    role: 0
});

userManager.create({
    photo: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
    email: 'emilybrown321@email.com',
    password: 'Brownie1234$',
    role: 0
});


//TESTING
// node src/data/memory/UserManager.js

//userManager.read()
//userManager.readOne('')
//userManager.update(1, {price: 5})
//userManager.destroy(1)







