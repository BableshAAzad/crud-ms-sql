require('reflect-metadata');
const express = require("express");
const AppDataSource = require("./config/AppDataSource.js")
const userRoutes = require("./routes/userRoutes.js");
const companyRoutes = require("./routes/companyRoutes.js")
const departmentRoutes = require("./routes/departmentRoutes.js")
const projectRoutes = require("./routes/projectRoutes.js")

const app = express();

app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", companyRoutes);
app.use("/api/v1", departmentRoutes);
app.use("/api/v1", projectRoutes)

//* Database Connection
// Initialize the data source connection
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        console.log("Entities loaded:", AppDataSource.entityMetadatas.map(metadata => metadata.name));
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
        process.exit(1);  // Exit on database connection failure
    });

app.listen(3005, () => {
    console.log(`Server listening at http://localhost:3005`)
})

module.exports = app;
