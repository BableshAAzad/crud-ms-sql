const { EntitySchema } = require("typeorm");
const User = require("./User.js");

const Company = new EntitySchema({
    name: "Company",
    tableName: "companies",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        companyName: {
            type: "varchar",
            length: 150,
            unique: true,
            nullable: false,
        },
        companyAddress: {
            type: "varchar",
            length: 250,
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
        userId: {
            type: "int",
            nullable: false,
        },
    },
    relations: {
        user: {
            type: "many-to-one",
            target: User,
            joinColumn: { name: "userId" },
        },
    },
});

module.exports = Company;
