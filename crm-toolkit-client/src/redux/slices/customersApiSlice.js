import apiSlice from "./apiSlice";

let API_URL;
if (process.env.NODE_ENV === "production") {
  API_URL = `http://ec2-18-217-180-76.us-east-2.compute.amazonaws.com:5000/customers`;
} else {
  API_URL = `http://localhost:5000/customers`;
}
const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerCustomer: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/register`,
        method: "POST",
        headers: { Authorization: `Bearer jwt=${data.cookie.jwt}` },
        body: data.formData,
      }),
    }),
    getCustomer: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/:${data.id}`,
        method: "GET",
        headers: { Authorization: `Bearer jwt=${data.cookie.jwt}` },
        body: data.clientId,
      }),
    }),
    getAllCustomers: builder.mutation({
      query: (cookie) => ({
        url: `${API_URL}/all`,
        method: "GET",
        headers: { Authorization: `Bearer jwt=${cookie.jwt}` },
      }),
    }),
    updateCustomer: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/update`,
        method: "POST",
        headers: { Authorization: `Bearer jwt=${data.cookie.jwt}` },
        body: data.clientId,
      }),
    }),
    deleteCustomer: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/delete`,
        method: "POST",
        headers: { Authorization: `Bearer jwt=${data.cookie.jwt}` },
        body: data.clientId,
      }),
    }),
  }),
});

export const {
  useRegisterCustomerMutation,
  useGetCustomerMutation,
  useGetAllCustomersMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApiSlice;
