import React, { useState, useEffect } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  SearchOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Search from "../forms/Search";
import { getCategories } from '../../functions/category';
import Logo from '../../images/LOGO.png'

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));  
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(c => {
        setCategories(c.data);
    });
  }, []);

  const showCategories = () => categories.map((c) => (
   
    <Item>
      <Link to={`/category/${c.slug}`}>{c.name}</Link>
    </Item>
  
  )); 

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
        type: "LOGOUT",
        payload: null
    });
    navigate("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
       
        
        <SubMenu icon={<img src={Logo} style={{
                objectFit: "cover",
                height: "20px",
                width: "50px"
              }} />} >
        <Link to="/"></Link>
          <Item>
              <Link to="/">Home</Link>
            </Item>
            <Item>
             <span>Produtos</span>
            </Item>
            
            {showCategories()}
      
        </SubMenu>
      
        <Link to="/shop">
            <Item key="shop" icon={<ShoppingOutlined />} >
            </Item>
        </Link>

      
        <SubMenu icon={<SearchOutlined />} >
          <span className="float-left"  >
            <Search  style={{marginRight : 'auto'}}/>
          </span>
        </SubMenu>

        <Link to="/cart" style={{marginLeft : 'auto'}}>
          <Item key="cart" icon={<ShoppingCartOutlined />}  >
              <Badge count={cart.length} offset={[1, 0]}>
              </Badge>
          </Item>
        </Link>

        

        {!user && (
          <Item key="register" icon={<UserAddOutlined /> } >
            <Link to="/register">Cadstro</Link>
          </Item>
        )}

        {!user && (
          <Item key="login" icon={<UserOutlined />} >
            <Link to="/login">Login</Link>
          </Item>
        )}

        {user && (
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email && user.email.split("@")[0]}
            className="float-right"
           
          >
            {user && user.role === "subscriber" && (
              <Item>
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}

            {user && user.role === "admin" && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}

            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}

        
        
      </Menu>
  );
};

export default Header;
