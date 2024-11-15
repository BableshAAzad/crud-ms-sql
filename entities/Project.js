const { EntitySchema } = require("typeorm");
const Department = require("./Department.js");

const Project = new EntitySchema({
    name: "Project",
    tableName: "Projects",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        projectName: {
            type: "varchar",
            length: 100,
            unique: false,
            nullable: false,
        },
        departmentId: {
            type: "int",
            nullable: false,
        },
        createdAt: {
            type: "datetime", // Use 'datetime'
            default: () => "GETDATE()", // Default value for creation time
        },
        updatedAt: {
            type: "datetime", // Use 'datetime'
            default: () => "GETDATE()", // Default value for updates
            onUpdate: "GETDATE()", // Automatically update on modification
        },
    },
    relations: {
        department: {
            type: "many-to-one",
            target: Department,
            joinColumn: { name: "departmentId" },
        },
    },
});

module.exports = Project;
