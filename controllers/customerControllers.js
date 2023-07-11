const CustomersList = require("../models/customersListSchema");
const registerCustomer = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, phone, address, status } = req.body;
    const customersList = await CustomersList.findById(user.email);
    customersList.list.push({
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
    const user = req.user;
    const customersList = await CustomersList.findById(user.email);
    console.log("LIst: ", customersList);
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

const deleteCustomers = async (req, res) => {
  try {
    const user = req.user;
    const customersToDelete = req.body;
    const customersList = await CustomersList.findById(user.email);
    let customers = customersList.list;

    customers = customers.filter(
      (customer) => !customersToDelete.includes(customer._id.toString())
    );
    const newList = await CustomersList.findByIdAndUpdate(
      user.email,
      { list: customers },
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
          message: "Deleted customer(s) successfully.",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, data: { message: error } });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, phone, address, status, _id } = req.body;

    const customersList = await CustomersList.findById(user.email);
    customersList.list.forEach((customer) => {
      if (customer._id.toString() === _id) {
        if (name) {
          customer.name = name;
        }
        if (email) {
          customer.email = email;
        }
        if (phone) {
          customer.phone = phone;
        }
        if (address) {
          customer.address = address;
        }
      }
      return customer;
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
          message: "Customer updated successfully.",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, data: { message: error } });
  }
};

module.exports = {
  registerCustomer,
  getAllCustomers,
  deleteCustomers,
  updateCustomer,
};
