const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 100,
      unique: true,
      nullable: false,
    },
    age: {
      type: "int",
      nullable: false,
    },
    userRole: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    createdAt: {
      type: "datetime",
      default: () => "GETDATE()", // Default value for creation time
    },
    updatedAt: {
      type: "datetime",
      default: () => "GETDATE()", // Set default to current timestamp
      onUpdate: "GETDATE()", // Automatically update on modification
    },
    isDeleted: {
      type: "bit", // Use 'bit' for MSSQL
      default: false, // Default value is 'false'
    },
  },
  relations: {
    projects: {
      type: "many-to-many",
      target: "Project",
      inverseSide: "users",
      joinTable: {
        name: "user_projects"
      },
    },
  },
});

module.exports = User;


