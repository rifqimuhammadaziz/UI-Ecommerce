import api from "./api";

export const findAllCategories = async () => {
  return await api.get("/api/categories");
};

export const createCategory = async (category) => {
  return await api.post("/api/categories", category);
};

export const updateCategory = async (category) => {
  return await api.put("/api/categories", category);
};

export const deleteCategoryById = async (category) => {
  return await api.delete(`/api/categories/${category.id}`, category);
};
