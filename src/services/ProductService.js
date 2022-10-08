import api from "./api";

export const findAllProducts = async () => {
  return await api.get("/api/products");
};

export const findProductByID = async (id) => {
  return await api.get(`/api/products/${id}`);
};

export const createProduct = async (product) => {
  return await api.post("/api/products", product);
};

export const updateProduct = async (product) => {
  return await api.put("/api/products", product);
};

export const deleteProductByID = async (id) => {
  return await api.delete(`/api/products/${id}`);
};
