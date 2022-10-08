import {
  Button,
  Column,
  DataTable,
  Dropdown,
  InputText,
  ProgressBar,
} from "primereact";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainPage from "../../components/MainPage";
import { findAllCategories } from "../../services/CategoryService";
import { createProduct } from "../../services/ProductService";

const ProductAdminCreatePage = () => {
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await findAllCategories();
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCategory();

    const emptyProduct = {
      id: null,
      name: "",
      category: {
        id: null,
      },
      description: "",
      stock: 0,
      price: 0,
    };
    setProduct(emptyProduct);
    setLoading(false);
  }, []);

  const saveProduct = async () => {
    try {
      setSubmitted(true);
      const response = await createProduct(product);
      const _product = response.data;
      navigate(`/admin/product/detail/${_product.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainPage>
      {loading ? (
        <ProgressBar mode="indeterminate" className="my-progress-bar" />
      ) : (
        <div className="main-content">
          <div className="content">
            <div className="content-inner">
              <div className="content-header">
                <h2>Create New Product</h2>
              </div>
              <div className="content-body">
                <div className="content-form shadow-1">
                  <div className="p-fluid mb-4">
                    <div className="p-field mb-3">
                      <label htmlFor="name" className="form-label">
                        Product Name
                      </label>
                      <InputText
                        value={product.name}
                        placeholder="Input Product Name"
                        id="name"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || "";
                          const _product = { ...product };
                          _product.name = val;
                          setProduct(_product);
                        }}
                      />
                      {submitted && !product.name && (
                        <span className="p-error">
                          Product name is required
                        </span>
                      )}
                    </div>

                    <div className="p-field mb-3">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <Dropdown
                        optionLabel="name" // category name
                        optionValue="id"
                        id="category"
                        value={product.category.id}
                        options={categories}
                        placeholder="Choose Category"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || null;
                          const _product = { ...product };
                          _product.category.id = val;
                          setProduct(_product);
                        }}
                      />
                      {submitted && !product.category.id && (
                        <span className="p-error">
                          Category Product is required
                        </span>
                      )}
                    </div>

                    <div className="p-field mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <InputText
                        value={product.description}
                        placeholder="Input Product Description"
                        id="description"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || "";
                          const _product = { ...product };
                          _product.description = val;
                          setProduct(_product);
                        }}
                      />
                    </div>

                    <div className="p-field mb-3">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <InputText
                        value={product.price}
                        placeholder="Input Product Price"
                        id="price"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || "";
                          const _product = { ...product };
                          _product.price = val;
                          setProduct(_product);
                        }}
                      />
                      {submitted && !product.price && (
                        <span className="p-error">
                          Product price is required
                        </span>
                      )}
                    </div>

                    <div className="p-field mb-3">
                      <label htmlFor="price" className="form-label">
                        Stock
                      </label>
                      <InputText
                        value={product.stock}
                        placeholder="Input Product Stock"
                        id="stock"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || "";
                          const _product = { ...product };
                          _product.stock = val;
                          setProduct(_product);
                        }}
                      />
                      {submitted && !product.stock && (
                        <span className="p-error">
                          Product stock is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Button
                      label="Save Product"
                      icon="pi pi-check"
                      onClick={saveProduct}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainPage>
  );
};

export default ProductAdminCreatePage;
