import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { clientFormat } from "../../utils/formats";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterCustomerMutation } from "../../redux/slices/customersApiSlice";
import { setCustomers } from "../../redux/slices/customersListReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomerModal({ open, handleModalClose }) {
  const { customers } = useSelector((state) => state.customers);
  const [cookie] = useCookies(["jwt"]);
  const [form, setForm] = useState(clientFormat);

  const [registerCustomer, { isLoading }] = useRegisterCustomerMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { name, email, phone, address, status } = form;
    if (name === "" || email === "") {
      return toast.warn("Invalid client details!");
    }
    try {
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("status", status);
      const res = await registerCustomer({ formData, cookie }).unwrap();
      const customersList = res.data.customersList.list;
      dispatch(setCustomers(customersList));
      setForm(clientFormat);
      handleModalClose();
      return toast.success(res.data.message);
    } catch (e) {
      return toast.error(e?.data?.message || e.message);
    }
  };

  const handleInputChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                marginBottom: 1.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Register a new client
            </Typography>

            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",

                gap: "14px",
              }}
            >
              <TextField
                id="name"
                type="text"
                label="Name"
                name="name"
                variant="filled"
                value={form.name}
                onChange={handleInputChange}
              />
              <TextField
                id="email"
                type="email"
                label="Email"
                variant="filled"
                name="email"
                value={form.email}
                onChange={handleInputChange}
              />
              <TextField
                id="phone"
                type="number"
                label="Phone"
                name="phone"
                variant="filled"
                value={form.phone}
                onChange={handleInputChange}
              />
              <TextField
                id="address"
                type="text"
                label="Address"
                name="address"
                variant="filled"
                value={form.address}
                onChange={handleInputChange}
              />
              <TextField
                id="status"
                type="text"
                label="Status"
                name="status"
                variant="filled"
                value={form.status}
                onChange={handleInputChange}
              />

              <Button
                type="submit"
                variant="filled"
                sx={{
                  background: "#222",
                  color: "#FFF",
                  ":hover": {
                    color: "#000",
                    border: "1px solid #000",
                  },
                }}
              >
                Register client
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
