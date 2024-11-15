const User = require('../entities/User.js')
const Project = require('../entities/Project.js')
const Department = require("../entities/Department.js")
const AppDataSource = require("../config/AppDataSource.js")

class ProjectController {
    // ^---------------------------------------------------------------------------------------------------------
    static addProject = async (req, resp) => {
        const { userId, departmentId } = req.params
        if (userId && departmentId) {
            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOne({ where: { id: userId } })
            if (user) {
                const departmentRepository = AppDataSource.getRepository(Department)
                const department = await departmentRepository.findOne({ where: { id: departmentId } })
                if (department) {
                    if (user.userRole === "MANAGER") {
                        try {
                            const { projectName } = req.body
                            const projectRepository = AppDataSource.getRepository(Project)
                            const project = projectRepository.create({ projectName, departmentId })
                            await projectRepository.save(project);
                            resp.status(201).send({ status: 201, message: "Project Creation successful done" });
                        } catch (error) {
                            resp.status(500).json({ message: "Failed to add project", rootCause: error.message });
                        }
                    } else {
                        resp.status(400).send({ status: 400, message: "Illegal Operation: only Manager can be create projects" });
                    }
                } else {
                    resp.status(400).send({ status: 400, message: "Illegal Operation: department does not exist" });
                }
            } else {
                resp.status(400).send({ status: 400, message: "Illegal Operation: user not exist" });
            }
        } else {
            resp.status(500).send({ status: 500, message: "Illegal Operation: Missing User ID or Department ID" });
        }
    }
    // ^---------------------------------------------------------------------------------------------------------

    // ^---------------------------------------------------------------------------------------------------------

    // ^---------------------------------------------------------------------------------------------------------

}

module.exports = ProjectController