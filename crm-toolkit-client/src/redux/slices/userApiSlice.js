import apiSlice from "./apiSlice";
let API_URL;
if (process.env.NODE_ENV === "production") {
  API_URL = `http://ec2-18-217-180-76.us-east-2.compute.amazonaws.com:5000/user`;
} else {
  API_URL = `http://localhost:5000/user`;
}

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/update`,
        method: "POST",
        headers: { Authorization: `Bearer jwt=${data.token}` },
        body: data.formData,
      }),
    }),
    delete: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/delete`,
        method: "POST",
        headers: { Authorization: `Bearer jwt=${data.token}` },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateMutation,
  useDeleteMutation,
} = userApiSlice;
