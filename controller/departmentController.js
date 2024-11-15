const User = require('../entities/User.js')
const Company = require("../entities/Company.js")
const Department = require("../entities/Department.js")
const AppDataSource = require("../config/AppDataSource.js")

class DepartmentController {
    // ^---------------------------------------------------------------------------------------------------------
    static addDepartment = async (req, resp) => {
        const { userId, companyId } = req.params
        if (userId && companyId) {
            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOne({ where: { id: userId } })
            if (user) {
                const companyRepository = AppDataSource.getRepository(Company)
                const company = await companyRepository.findOne({ where: { id: companyId } })
                if (company) {
                    if (user.userRole === "ADMIN") {
                        try {
                            const { departmentName } = req.body
                            const departmentRepository = AppDataSource.getRepository(Department)
                            const department = departmentRepository.create({
                                departmentName,
                                companyId,
                            })
                            await departmentRepository.save(department);
                            resp.status(201).send({ status: 201, message: "Department successful created" });
                        } catch (error) {
                            resp.status(500).json({ message: "Failed to register Department", rootCause: error.message });
                        }
                    } else {
                        resp.status(400).send({ status: 400, message: "Illegal Operation: only admin can be create department" });
                    }
                } else {
                    resp.status(400).send({ status: 400, message: "Illegal Operation: company not exist" });
                }
            } else {
                resp.status(400).send({ status: 400, message: "Illegal Operation: user not exist" });
            }
        } else {
            resp.status(500).send({ status: 500, message: "Illegal Operation: Missing User ID or company ID" });
        }
    }
    // ^---------------------------------------------------------------------------------------------------------
    // ^---------------------------------------------------------------------------------------------------------
    // ^---------------------------------------------------------------------------------------------------------

}

module.exports = DepartmentController