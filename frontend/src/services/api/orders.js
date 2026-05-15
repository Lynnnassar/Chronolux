import { client } from "@/services/api/client";

export const placeOrder = async (items) => {
  const response = await client.post("/orders", { items });
  return response.data;
};

export const getMyOrders = async () => {
  const response = await client.get("/orders/my-orders");
  return response.data;
};
