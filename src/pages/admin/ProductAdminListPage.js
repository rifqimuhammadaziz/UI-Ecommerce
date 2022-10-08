import { Button, Column, DataTable } from "primereact";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainPage from "../../components/MainPage";
import { findAllProducts } from "../../services/ProductService";

const ProductAdminPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await findAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  const nameBodyTemplate = (row) => {
    return (
      <Link to={`/admin/products/detail/${row.id}`} className="cell-link">
        {row.name}
      </Link>
    );
  };

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Product</h2>
              <div className="p-d-inline">
                <Link
                  to="/admin/products/create"
                  style={{ textDecoration: "none" }}
                >
                  <Button label="Add Products" icon="pi pi-plus" />
                </Link>
              </div>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable
                  value={products}
                  size="small"
                  stripedRows
                  className="table-view"
                >
                  <Column
                    field="name"
                    header="Product Name"
                    body={nameBodyTemplate}
                  />
                  <Column field="category.name" header="Category" />
                  <Column
                    field="price"
                    header="Price"
                    style={{ width: "100px" }}
                  />
                  <Column
                    field="stock"
                    header="Stock"
                    style={{ width: "100px" }}
                  />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default ProductAdminPage;
