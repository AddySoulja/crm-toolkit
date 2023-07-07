const Customer = require("../models/customerModel");

const registerCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, info } = req.body;

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      info,
    });
    console.log(customer);
    if (customer) {
      return res.status(201).json({
        ok: true,
        data: {
          customer,
          message: "Customer created successfully.",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, data: { message: error } });
  }
};

module.exports = { registerCustomer };
