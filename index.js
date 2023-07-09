if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const connect = require("./configs/mongoDb");
const configPassportJwt = require("./configs/passportJWT");
const path = require("path");
const fileURLToPath = require("url").fileURLToPath;
const dirname = path.dirname;

const app = express();
const port = process.env.PORT;
connect();
configPassportJwt(passport);

//Routers
const userRouter = require("./routes/userRoutes");
const customersRoute = require("./routes/customersRoutes");
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/user", userRouter);
app.use("/customers", customersRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "crm-toolkit-client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "crm-toolkit-client/build", "index.html"));
});

app.listen(port, () => console.log("Server running at port: ", port));
