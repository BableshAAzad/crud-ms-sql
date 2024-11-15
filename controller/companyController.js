const User = require('../entities/User.js')
const Company = require("../entities/Company.js")
const AppDataSource = require("../config/AppDataSource.js")

class CompanyController {
    // ^---------------------------------------------------------------------------------------------------------
    static addCompany = async (req, resp) => {
        const { userId } = req.params
        if (userId) {
            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOne({ where: { id: userId } })
            if (user) {
                if (user.userRole === "ADMIN") {
                    try {
                        const { companyName, companyAddress } = req.body
                        const companyRepository = AppDataSource.getRepository(Company)
                        const company = companyRepository.create({
                            companyName,
                            companyAddress,
                            userId,
                        })
                        await companyRepository.save(company);
                        resp.status(201).send({ status: 201, message: "Company Registration successful done" });
                    } catch (error) {
                        resp.status(500).json({ message: "Failed to Register company", rootCause: error.message });
                    }
                } else {
                    resp.status(400).send({ status: 400, message: "Illegal Operation: only admin can be create company" });
                }
            } else {
                resp.status(400).send({ status: 400, message: "Illegal Operation: user not exist" });
            }
        } else {
            resp.status(500).send({ status: 500, message: "Illegal Operation: Missing User ID" });
        }
    }
    // ^---------------------------------------------------------------------------------------------------------

    // ^---------------------------------------------------------------------------------------------------------

    // ^---------------------------------------------------------------------------------------------------------

}

module.exports = CompanyController