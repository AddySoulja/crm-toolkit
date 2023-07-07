if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const passport = require("passport");
const connect = require("./configs/mongoDb");
const configPassportJwt = require("./configs/passportJWT");

const app = express();
const port = process.env.PORT;
connect();
configPassportJwt(passport);

//Routers
const userRouter = require("./routes/userRoutes");
const customerRouter = require("./routes/customerRoutes");
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/user", userRouter);
app.use("/customer", customerRouter);

app.listen(port, () => console.log("Server running at port: ", port));
