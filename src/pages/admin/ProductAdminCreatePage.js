import {
  Button,
  Dropdown,
  FileUpload,
  InputText,
  ProgressBar,
} from "primereact";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPage from "../../components/MainPage";
import { APP_BASE_URL } from "../../configs/Constants";
import { findAllCategories } from "../../services/CategoryService";
import { createProduct } from "../../services/ProductService";

const ProductAdminCreatePage = () => {
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [img, setImg] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // get all categories
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

    // define product
    const emptyProduct = {
      id: null,
      name: "",
      image: "",
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

  // function to save product
  const saveProduct = async () => {
    try {
      setSubmitted(true);
      const response = await createProduct(product);
      const _product = response.data;
      navigate(`/admin/products/detail/${_product.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // function to upload image
  const onUpload = async (event) => {
    const [file] = event.files;
    const imageObjectURL = URL.createObjectURL(file);
    setImg(imageObjectURL);
    const response = JSON.parse(event.xhr.response);
    const _product = product;
    _product.image = response.fileName;
  };

  // get user
  const user = JSON.parse(localStorage.getItem("user"));

  // get token before send image
  const onBeforeSend = async (event) => {
    if (user && user.token) {
      event.xhr.setRequestHeader("Authorization", "Bearer " + user.token);
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
                  <div className="flex">
                    <div className="flex-grow-1">
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
                    </div>

                    <div
                      className="flex-none ml-6 mt-4"
                      style={{ textAlign: "center" }}
                    >
                      <div className="image-display-wrapper">
                        {img ? (
                          <img
                            src={img}
                            alt="product"
                            className="image-display"
                          />
                        ) : (
                          <i className="icon-display pi pi-image"></i>
                        )}
                      </div>
                      <FileUpload
                        name="file"
                        url={`${APP_BASE_URL}/api/uploadImage`}
                        auto
                        accept="image/*"
                        onUpload={onUpload}
                        onBeforeSend={onBeforeSend}
                        chooseLabel="Choose Product Image"
                        mode="basic"
                      />
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
