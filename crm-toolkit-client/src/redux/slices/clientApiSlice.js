import apiSlice from "./apiSlice";

const API_URL = `http://localhost:5000/client`;

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerClient: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/register`,
        method: "POST",
        headers: { Authorization: `Bearer jwt=${data.cookie.jwt}` },
        body: data.formData,
      }),
    }),
    getClient: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/get`,
        method: "GET",
        headers: { Authorization: `Bearer jwt=${data.cookie.jwt}` },
        body: data.clientId,
      }),
    }),
    getAllClients: builder.mutation({
      query: (cookie) => ({
        url: `${API_URL}/all`,
        method: "GET",
        headers: { Authorization: `Bearer jwt=${cookie.jwt}` },
      }),
    }),
    updateClient: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/update`,
        method: "POST",
        headers: { Authorization: `Bearer jwt=${data.cookie.jwt}` },
        body: data.clientId,
      }),
    }),
    deleteClient: builder.mutation({
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
  useRegisterClientMutation,
  useGetAllClientsMutation,
  useGetClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = userApiSlice;
