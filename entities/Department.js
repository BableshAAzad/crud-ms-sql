const { EntitySchema } = require("typeorm");
const Company = require("./Company.js");

const Department = new EntitySchema({
    name: "Department",
    tableName: "Departments",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        departmentName: {
            type: "varchar",
            length: 100,
            unique: true,
            nullable: false,
        },
        createdAt: {
            type: "datetime", // Changed to 'datetime'
            default: () => "GETDATE()", // Default value for creation time
        },
        updatedAt: {
            type: "datetime", // Changed to 'datetime'
            default: () => "GETDATE()", // Set default to current timestamp
            onUpdate: "GETDATE()", // Automatically update on modification
        },
        companyId: {
            type: "int",
            nullable: false,
        }
    },
    relations: {
        company: {
            type: "many-to-one",
            target: Company,
            joinColumn: { name: "companyId" },
        },
    },
});

module.exports = Department;
