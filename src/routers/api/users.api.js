import { Router } from "express";
import userManager from '../../data/fs/files/UserManager.fs.js'

const usersRouter = Router();

//routes
usersRouter.get('/', read);
usersRouter.get('/:uid', readOne);
usersRouter.post('/', create);
usersRouter.put('/:uid', update);
usersRouter.delete('/:uid', destroy);

//functions
async function read (req, res, next) {
    try {
        const { role } = req.query;
        const allUsers = await userManager.read(role);
        if (allUsers) {
            return res.json({
                statusCode: 200,
                response: allUsers,
                role,
                success: true
            });
        } else {
            const error = new Error("Error fetching data");
            error.status = 404;
            throw error;
        };
    } catch(err){
        return next(err);
    };
};

async function readOne (req, res, next) {
    try {
        const { uid } = req.params;
        const selected = await userManager.readOne(uid);
        if (selected) {
            return res.json({
                statusCode: 200,
                response: selected,
                success: true
            });
        } else {
            const error = new Error('Error fetching data');
            error.statuscode = 404;
            throw error;
        };
    } catch(err) {
        return next(err);
    };
};

async function create (req, res, next) {
    try {
        const data = req.body;
        const newUser = await userManager.create(data)
        return res.json({
            statusCode: 201,
            message: `User created successfully with id ${newUser.id}`,
            response: newUser
        });
    } catch(err) {
        return next(err);
    };
};

async function update (req, res, next) {
    try {
        const { uid } = req.params;
        const data = req.body;
        const updatedUser = await userManager.update(uid, data);
        return res.json({
            statusCode: 200,
            message: `User with id ${uid} updated successfully`,
            response: updatedUser
        });    
    } catch(err) {
        return next(err);
    };
};

async function destroy (req, res, next) {
    try {
        const { uid } = req.params;
        const deletedUser = await userManager.destroy(uid);
        return res.json({
            statusCode: 200,
            message: 'User deleted successfully',
            response: deletedUser
        });
    } catch(err) {
        return next(err);
    };
};

export default usersRouter;