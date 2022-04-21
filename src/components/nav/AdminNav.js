import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">
          Produto
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">
          Produtos
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Categoria
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link">
          Sub Categoria
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Senha
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
