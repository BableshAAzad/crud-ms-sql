const User = require("../entities/User");
const AppDataSource = require("../config/AppDataSource.js")
const UserRole = require("../appConstants/userRoles.js")

class UserController {
    // ^---------------------------------------------------------------------------------------------------------

    // Create a new user
    static addUser = async (req, resp) => {
        const { name, email, age, userRole } = req.body
        // Check if userRole is valid
        const isValidRole = Object.values(UserRole).includes(userRole);
        if (isValidRole) {
            try {
                const userRepository = AppDataSource.getRepository(User);
                const user = userRepository.create({ name, email, age, userRole });
                await userRepository.save(user);
                resp.status(201).json(user);
            } catch (error) {
                resp.status(500).json({ message: "Error saving user", rootCause: error.message });
            }
        } else {
            resp.status(400).send({ status: 400, message: "Illegal Operation: invalid user role" });
        }
    };
    // ^---------------------------------------------------------------------------------------------------------

    // Get all users
    static getAllUsers = async (req, resp) => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        resp.json(users);
    };
    // ^---------------------------------------------------------------------------------------------------------

    // Get a user by ID
    static getUser = async (req, resp) => {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: req.params.userId } });
        if (!user) return resp.status(404).json({ message: "User not found" });
        resp.json(user);
    };
    // ^---------------------------------------------------------------------------------------------------------

    // Update a user by ID
    static updateUsers = async (req, resp) => {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: req.params.userId } });
        if (!user) return resp.status(404).json({ message: "User not found" });

        userRepository.merge(user, req.body);
        const respult = await userRepository.save(user);
        resp.json(respult);
    };
    // ^---------------------------------------------------------------------------------------------------------

    // Delete a user by ID
    static deleteUser = async (req, resp) => {
        const userRepository = AppDataSource.getRepository(User);
        const respult = await userRepository.delete(req.params.userId);
        if (respult.affected === 0) return resp.status(404).json({ message: "User not found" });
        resp.status(204).send();
    };
    // ^---------------------------------------------------------------------------------------------------------

}



module.exports = UserController;
