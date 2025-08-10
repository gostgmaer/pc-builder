const express = require("express");
// const logger = require('./src/lib/logger');
require("dotenv").config();
const connectDB = require("./src/db/dbConnact");
const { dbUrl, serverPort } = require("./src/config/setting");


const app = express();
var cors = require("cors");
// const helmet = require("helmet");
const userRouter = require("./src/routes/user");
const settingRoute = require("./src/routes/settingRoutes");
const authRoute = require("./src/routes/auth");
const categoryRoute = require("./src/routes/categories");
const BrandRoute = require("./src/routes/brand");
const componentRoute = require("./src/routes/components");


app.use(cors({
  origin: "*", // Allow all origins
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS,HEAD',
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("APP is working!");
});

app.get("/api", (req, res) => {
  res.send("API is working!");
});

// app.use(logMiddleware);
app.use("/api", userRouter);
app.use('/api',settingRoute)
app.use("/api", authRoute);
app.use("/api", categoryRoute);
app.use("/api", componentRoute);
app.use("/api", BrandRoute);




const start = async (res) => {
  try {
    connectDB(dbUrl);
    app.listen(serverPort, () => {
      console.log(`Server is running on port ${serverPort}`);
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "Internal Server Error",
      message: error.message,
    });
  }
};
start();
