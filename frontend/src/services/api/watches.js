import { client } from "@/services/api/client";

export const getWatches = async (params = {}) => {
  const response = await client.get("/watches", { params });
  return response.data;
};

export const getWatchById = async (id) => {
  const response = await client.get(`/watches/${id}`);
  return response.data;
};
