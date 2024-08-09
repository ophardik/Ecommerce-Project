const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const fs = require("fs");
const { connectToMongoDB } = require("./connection");
const userRoute = require("./routes/userRoute");

const app = express();

const uploadDir = path.join(__dirname, 'uploads');


// Middleware setup
app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT ||8002;

// Connect to MongoDB
connectToMongoDB("mongodb+srv://hardikkhandelwal2514:4MV3aYHQuKg4W5So@cluster0.chlr3v6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB started"))
    .catch((err) => console.log("Error in connecting MongoDB", err));
    
    const outputDir = path.resolve(__dirname, 'invoices');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
// Use the user routes for handling user-related endpoints
app.use("/api", userRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = {
    app,
};
