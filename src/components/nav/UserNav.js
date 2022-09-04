import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link">
        <h7 style={{ color: 'green' }}>Meus Pedidos</h7>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/data" className="nav-link">
            <h7 style={{ color: 'green' }}>Meus Dados</h7>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
            <h7 style={{ color: 'green' }}>Alterar Senha</h7>
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
