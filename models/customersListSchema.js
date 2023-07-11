const mongoose = require("mongoose");

const customersListSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    list: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: Number,
        address: String,
        status: String,
      },
    ],
  },
  { collections: "Customers_List" },
  { timestamps: true }
);

const CustomersList = mongoose.model("Customers_List", customersListSchema);

module.exports = CustomersList;
