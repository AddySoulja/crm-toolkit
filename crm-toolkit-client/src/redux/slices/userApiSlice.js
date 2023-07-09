import apiSlice from "./apiSlice";

const API_URL = `http://localhost:5000/user`;

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
