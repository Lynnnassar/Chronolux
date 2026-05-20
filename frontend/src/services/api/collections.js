import { client } from "@/services/api/client";

export const getCollections = async () => {
  const response = await client.get("/collections");
  return response.data;
};
