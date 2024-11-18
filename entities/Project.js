const { EntitySchema } = require("typeorm");

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
            default: 0,
        },
        managerId: {
            type: "int",
            nullable: false,
            default: 0,
        },
        createdAt: {
            type: "datetime",
            default: () => "GETDATE()", // Default value for creation time
        },
        updatedAt: {
            type: "datetime",
            default: () => "GETDATE()", // Default value for updates
            onUpdate: "GETDATE()", // Automatically update on modification
        },
    },
    relations: {
        department: {
            type: "many-to-one",
            target: "Department",
            joinColumn: { name: "departmentId" },
        },
        // users: {
        //     type: "many-to-many",
        //     target: "User",
        //     joinTable: {
        //         name: "user_projects",
        //         joinColumn: { name: "projectId", referencedColumnName: "id" },
        //         inverseJoinColumn: { name: "userId", referencedColumnName: "id" }
        //     },
        // },
        users: {
            type: "many-to-many",
            target: "User",
            joinTable: true,
            inverseSide: "projects",
            joinTable: false
        },
    },
});

module.exports = Project;
