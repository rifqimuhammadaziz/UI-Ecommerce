import { Menu } from "primereact";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Sidebar = () => {
  const { signOut } = useAuth();

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-th-large",
      template: (item, options) => {
        return (
          <Link to="/admin/dashboard" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Order",
      icon: "pi pi-shopping-cart",
      template: (item, options) => {
        return (
          <Link to="/admin/orders" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Category",
      icon: "pi pi-tags",
      template: (item, options) => {
        return (
          <Link to="/admin/categories" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Product",
      icon: "pi pi-box",
      template: (item, options) => {
        return (
          <Link to="/admin/products" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "User",
      icon: "pi pi-users",
      template: (item, options) => {
        return (
          <Link to="/admin/users" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Sign Out",
      icon: "pi pi-sign-out",
      command: () => signOut(),
    },
  ];
  return (
    <div className="sidebar">
      <h3>Sidebar</h3>
      <Menu model={items} />
    </div>
  );
};

export default Sidebar;
