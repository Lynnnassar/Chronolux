import { client } from "@/services/api/client";

export const getBrands = async () => {
  const response = await client.get("/brands");
  return response.data;
};
