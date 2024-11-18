const User = require("../entities/User");
const AppDataSource = require("../config/AppDataSource.js")
const UserRole = require("../appConstants/userRoles.js");
const Project = require("../entities/Project.js");

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
        const result = await userRepository.save(user);
        resp.json(result);
    };
    // ^---------------------------------------------------------------------------------------------------------

    // Delete a user by ID
    static deleteUser = async (req, resp) => {
        const userRepository = AppDataSource.getRepository(User);
        const result = await userRepository.delete(req.params.userId);
        if (result.affected === 0) return resp.status(404).json({ message: "User not found" });
        resp.status(204).send();
    };
    // !---------------------------------------------------------------------------------------------------------

    static getProjectNames = async (req, resp) => {
        const { userId } = req.params; // Extract userId from the request parameters
        if (userId) {
            try {
                // Fetch only the project names directly
                const projectRepository = AppDataSource.getRepository(Project);
                console.log("-----------------------------------------------------------------------------")
                const projectNames = await projectRepository.find({
                    where: {
                        users: { id: userId }, // Filter by userId in the users relation
                    },
                    select: ["projectName", "managerId"] // Select only the projectName, managerId field
                });

                // if (projectNames) {
                resp.status(200).json({
                    message: `User is working on ${projectNames.length} projects`,
                    projectNames: projectNames, // List of project names
                });
                // } else {
                //     resp.status(400).send({
                //         status: 400,
                //         message: "Illegal Operation: User does not exist",
                //     });
                // }
            } catch (error) {
                resp.status(500).json({ message: "Failed to fetch projects", rootCause: error.message });
            }
        } else {
            resp.status(400).send({
                status: 400,
                message: "Illegal Operation: User ID not found",
            });
        }
    };

    // ^---------------------------------------------------------------------------------------------------------

    // ^---------------------------------------------------------------------------------------------------------

}



module.exports = UserController;
