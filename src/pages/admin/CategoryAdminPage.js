import { Button, Column, DataTable, Dialog, InputText } from "primereact";
import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import {
  createCategory,
  deleteCategoryById,
  findAllCategories,
  updateCategory,
} from "../../services/CategoryService";

const CategoryAdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [insertMode, setInsertMode] = useState(false);

  const emptyCategory = {
    id: null,
    name: "",
  };
  const [category, setCategory] = useState(emptyCategory);

  useEffect(() => {
    load();
  }, []);

  // get data method
  const load = async () => {
    try {
      const response = await findAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // show add category dialog
  const showAddCategoryDialog = () => {
    setCategory(emptyCategory);
    setInsertMode(true);
    setCategoryDialog(true);
    setSubmitted(false);
  };

  // hide add category dialog
  const hideAddCategoryDialog = () => {
    setCategoryDialog(false);
    setSubmitted(false);
  };

  const hideDeleteCategoryDialog = () => {
    setDeleteCategoryDialog(false);
  };

  const editCategory = (category) => {
    setInsertMode(false);
    setSubmitted(false);
    setCategory({ ...category });
    setCategoryDialog(true);
  };

  const confirmDeleteCategory = (category) => {
    setCategory(category);
    setDeleteCategoryDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-plain p-mr-2"
          onClick={() => editCategory(rowData)}
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-text p-button-plain p-mr-2"
          onClick={() => confirmDeleteCategory(rowData)}
        />
      </React.Fragment>
    );
  };

  const findIndexByID = (id) => {
    let index = -1;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const saveCategory = async () => {
    try {
      setSubmitted(true);
      if (category.name.trim()) {
        if (insertMode) {
          const response = await createCategory(category);
          const data = response.data;
          const _categories = [...categories];
          _categories.push(data);
          setCategories(_categories);
        } else {
          // editMode
          const response = await updateCategory(category);
          const data = response.data;
          const _categories = [...categories];
          const index = findIndexByID(data.id);
          _categories[index] = data;
          setCategories(_categories);
        }
        setInsertMode(false);
        setCategoryDialog(false);
        setCategory(emptyCategory);
        setSubmitted(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async () => {
    try {
      await deleteCategoryById(category.id);
      let _categories = categories.filter((val) => val.id !== category.id);
      setCategories(_categories);
      setDeleteCategoryDialog(false);
      setCategory(emptyCategory);
    } catch (error) {
      console.error(error);
    }
  };

  const categoryDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideAddCategoryDialog}
      />
      <Button
        label="Add Category"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveCategory}
      />
    </React.Fragment>
  );

  const deleteCategoryDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteCategoryDialog}
      />
      <Button
        label="Delete Category"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteCategory}
      />{" "}
    </React.Fragment>
  );

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Category</h2>
              <div className="p-d-inline">
                <Button
                  label="Add Category"
                  icon="pi pi-plus"
                  onClick={showAddCategoryDialog}
                />
              </div>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable
                  value={categories}
                  size="small"
                  className="table-view"
                  stripedRows
                >
                  <Column field="name" header="Category Name"></Column>
                  <Column
                    body={actionBodyTemplate}
                    style={{ width: "128px", textAlign: "right" }}
                  ></Column>
                </DataTable>
              </div>
            </div>

            <Dialog
              visible={categoryDialog}
              style={{ width: "500px" }}
              header="Category"
              modal
              className="p-fluid"
              onHide={hideAddCategoryDialog}
              footer={categoryDialogFooter}
            >
              <div className="p-field">
                <label htmlFor="name">Category Name</label>
                <InputText
                  id="name"
                  value={category.name}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _category = { ...category };
                    _category.name = val;
                    setCategory(_category);
                  }}
                />
                {submitted && !category.name && (
                  <small className="p-error">Category name is required</small>
                )}
              </div>
            </Dialog>
            <Dialog
              visible={deleteCategoryDialog}
              style={{ width: "500px" }}
              header="Confirmation"
              modal
              onHide={hideDeleteCategoryDialog}
            >
              <div className="confirmation-content">
                <i
                  className="pi pi-exclamation-triangle p-mr-3"
                  style={{ fontSize: "2rem" }}
                ></i>
                {category && (
                  <span>
                    Are you sure to delete category? <b>{category.name}</b>
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default CategoryAdminPage;
