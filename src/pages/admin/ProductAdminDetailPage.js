import { Button, ConfirmDialog, ProgressBar } from "primereact";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainPage from "../../components/MainPage";
import { APP_BASE_URL } from "../../configs/Constants";
import {
  deleteProductByID,
  findProductByID,
} from "../../services/ProductService";

const ProductAdminDetailPage = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [img, setImg] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // get product
    const loadProduct = async () => {
      try {
        const response = await findProductByID(id);
        const _product = response.data;
        setProduct(_product);

        // get image
        if (_product.image) {
          fetchImage(_product.image);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadProduct();
    // eslint-disable-next-line
  }, [id]);

  // get token
  const user = JSON.parse(localStorage.getItem("user"));

  // get image product
  const fetchImage = async (image) => {
    const response = await fetch(`${APP_BASE_URL}/api/images/${image}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  // function delete product
  const handleDelete = async () => {
    try {
      await deleteProductByID(id);
      navigate("/admin/products", {
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
                <h2>Detail Product : {product.name}</h2>
                <div>
                  <Link to="/admin/products">
                    <Button
                      label="Back"
                      icon="pi pi-chevron-left"
                      className="mr-2"
                    />
                  </Link>
                  <Link to={`/admin/products/edit/${product.id}`}>
                    <Button label="Edit" icon="pi pi-pencil" className="mr-2" />
                  </Link>

                  <Button
                    label="Delete Product"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => setDeleteDialog(true)}
                  />

                  <ConfirmDialog
                    visible={deleteDialog}
                    onHide={() => setDeleteDialog(false)}
                    message="Are you sure to delete this product?"
                    header="Delete Confirmation"
                    icon="pi pi-exclamation-triangle"
                    accept={handleDelete}
                  />
                </div>
              </div>
              <div className="content-body">
                <div className="content-detail shadow-1">
                  <div className="flex">
                    <div className="flex-grow-1">
                      <div className="grid">
                        <div className="col-fixed detail-label">
                          Product Name
                        </div>
                        <div className="col">{product.name}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Category</div>
                        <div className="col">{product.category.name}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">
                          Description
                        </div>
                        <div className="col">{product.description}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Price</div>
                        <div className="col">{product.price}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Stock</div>
                        <div className="col">{product.stock}</div>
                      </div>
                    </div>
                    <div className="flex-none">
                      <div className="image-display-wrapper">
                        {img ? (
                          <img
                            src={img}
                            alt="Product"
                            className="image-display"
                          />
                        ) : (
                          <i className="icon-display pi pi-image"></i>
                        )}
                      </div>
                    </div>
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

export default ProductAdminDetailPage;
