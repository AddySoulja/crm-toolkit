const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//user schema
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: Buffer },
    customersListId: { type: String },
  },
  { collection: "Users" },
  { timestamps: true }
);

//calling pre method of mongoose schema before user creation to save password as a hash
//privacy reasons
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) return next(error);
    this.password = hash;
    next();
  });
});

//custom method for user schema to match passwords
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
