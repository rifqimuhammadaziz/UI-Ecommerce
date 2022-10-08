import { Button, ConfirmDialog, ProgressBar } from "primereact";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainPage from "../../components/MainPage";
import {
  deleteProductByID,
  findAllProducts,
  findProductByID,
} from "../../services/ProductService";

const ProductAdminDetailPage = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await findProductByID(id);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadProduct();
  }, [id]);

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
                  <div className="grid">
                    <div className="col-fixed detail-label">Product Name</div>
                    <div className="col">{product.name}</div>
                  </div>
                  <div className="grid">
                    <div className="col-fixed detail-label">Category</div>
                    <div className="col">{product.category.name}</div>
                  </div>
                  <div className="grid">
                    <div className="col-fixed detail-label">Description</div>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </MainPage>
  );
};

export default ProductAdminDetailPage;
