const { v4: genCustomerId } = require("uuid");
const CustomersList = require("../models/customersListSchema");
const registerCustomer = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, phone, address, status } = req.body;
    const customersList = await CustomersList.findById(user.email);
    customersList.list.push({
      id: genCustomerId(),
      name,
      email,
      phone,
      address,
      status,
    });
    const newList = await CustomersList.findByIdAndUpdate(
      { _id: user.email },
      customersList,
      {
        returnDocument: "after",
        new: true,
      }
    );
    if (newList) {
      return res.status(201).json({
        ok: true,
        data: {
          customersList: newList,
          message: "Customer added successfully.",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, data: { message: error } });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customersList = await Customer.find({});
    if (customersList) {
      return res.status(201).json({
        ok: true,
        data: {
          customersList,
          message: "Fetched customers list successfully.",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, data: { message: error } });
  }
};

module.exports = { registerCustomer, getAllCustomers };
