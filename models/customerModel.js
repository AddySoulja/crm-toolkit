const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    address: { type: String },
    info: { type: String },
  },
  { collections: "Customers" },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
