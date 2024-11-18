const User = require('../entities/User.js')
const Project = require('../entities/Project.js')
const Department = require("../entities/Department.js")
const AppDataSource = require("../config/AppDataSource.js")
const { In } = require("typeorm");

class ProjectController {
    // ^---------------------------------------------------------------------------------------------------------
    static addProject = async (req, resp) => {
        const { userId, departmentId } = req.params;
        const { userIds, projectName } = req.body; // Assuming userIds are passed in the body as an array of user IDs

        if (userId && departmentId && userIds && userIds.length > 0 && projectName) {
            const userRepository = AppDataSource.getRepository(User);
            const departmentRepository = AppDataSource.getRepository(Department);
            const projectRepository = AppDataSource.getRepository(Project);

            try {
                console.log("+++++++++++++++++++++++++++++++++++++++++++++++")
                // Find the user who is creating the project (e.g., the Manager)
                const user = await userRepository.findOne({ where: { id: userId } });
                if (!user) {
                    return resp.status(400).send({ status: 400, message: "User does not exist" });
                }

                // Check if the department exists
                const department = await departmentRepository.findOne({ where: { id: departmentId } });
                if (!department) {
                    return resp.status(400).send({ status: 400, message: "Department does not exist" });
                }

                // Check if the user has the role of "MANAGER"
                if (user.userRole !== "MANAGER") {
                    return resp.status(400).send({ status: 400, message: "Only a Manager can create projects" });
                }

                // Create the project
                const project = projectRepository.create({
                    projectName,
                    departmentId,
                    managerId: userId
                });

                // Find all users by their IDs
                const users = await userRepository.find({
                    where: {
                        id: In(userIds),
                        userRole: In(["EMPLOYEE", "MANAGER"]),
                    },
                });

                if (users.length !== userIds.length) {
                    return resp.status(400).send({ status: 400, message: "One or more users do not exist or not match with role" });
                }

                // Assign users to the project
                project.users = users; // This links the users to the project

                // Save the project along with the associated users
                await projectRepository.save(project);

                resp.status(201).send({ status: 201, message: "Project creation successful", project });
            } catch (error) {
                console.error(error);
                resp.status(500).json({ message: "Failed to add project", rootCause: error.message });
            }
        } else {
            resp.status(400).send({
                status: 400,
                message: "Missing required data: User ID, Department ID, User IDs or Project Name",
            });
        }
    }
    // ^---------------------------------------------------------------------------------------------------------
    static getProject = async (req, resp) => {
        let { projectId } = req.params
        if (projectId) {
            const projectRepository = AppDataSource.getRepository(Project);
            let project = await projectRepository.findOne({ where: { id: projectId } })
            if (project) {
                resp.status(200).send({ status: 200, message: "Project founded", data: project })
            } else {
                resp.status(400).send({
                    status: 400,
                    message: "Illegal operation: project id does not exist",
                });
            }
        } else {
            resp.status(400).send({
                status: 400,
                message: "Illegal operation: missing project id ",
            });
        }

    }

    // ^---------------------------------------------------------------------------------------------------------

    static getUserNames = async (req, resp) => {
        let { projectId } = req.params
        if (projectId) {
            try {
                const projectRepository = AppDataSource.getRepository(Project);
                // Fetch the project along with associated users
                console.log("---------------------------------------------------------------------------")
                const project = await projectRepository.findOne({
                    where: { id: projectId },
                    relations: ["users"], // Load associated users
                    select: { users: { name: true, id : true } }, // Fetch only the `name` field of users
                });

                resp.status(200).send({
                    status: 200,
                    message: "User names are founded successfully",
                    data: project.users, // Return list of user names
                });
            } catch (error) {
                resp.status(500).send({
                    status: 500,
                    message: "Failed to fetch user names",
                    rootCause: error.message,
                });
            }
        } else {
            resp.status(400).send({
                status: 400,
                message: "Illegal operation: missing project id ",
            });
        }
    }
    // ^---------------------------------------------------------------------------------------------------------

}

module.exports = ProjectController