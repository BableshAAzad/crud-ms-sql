const User = require("../entities/User");
const AppDataSource = require("../config/AppDataSource.js")

class UserController {
    // Create a new user
    static addUser = async (req, res) => {
        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create(req.body);
        await userRepository.save(user);
        res.status(201).json(user);
    };

    // Get all users
    static getUser = async (req, res) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        res.json(users);
    };

    // Get a user by ID
    static getAllUsers = async (req, res) => {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    };

    // Update a user by ID
    static updateUsers = async (req, res) => {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        userRepository.merge(user, req.body);
        const result = await userRepository.save(user);
        res.json(result);
    };

    // Delete a user by ID
    static deleteUser = async (req, res) => {
        const userRepository = AppDataSource.getRepository(User);
        const result = await userRepository.delete(req.params.id);
        if (result.affected === 0) return res.status(404).json({ message: "User not found" });
        res.status(204).send();
    };
}



module.exports = UserController;
