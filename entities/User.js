const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar",
      length: 100
    },
    email: {
      type: "varchar",
      length: 100,
      unique: true
    },
    age: {
      type: "int"
    }
  }
});

module.exports = User;
