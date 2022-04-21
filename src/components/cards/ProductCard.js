import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import defaultImage from "../../images/defaultImage.png";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // destructure
  const { images, title, price, slug } = product;
  return (
    <Link to={`/product/${slug}`}>
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : defaultImage}
          style={{ height: "350px" }}
          className="p-1"
        />
      }
      actions={[
        // <Link to={`/product/${slug}`}>
        //   {/* <EyeOutlined  className="text-danger"/> <br /> Ver Produto */}
        // </Link>,
        // <>
        //   <ShoppingCartOutlined className="text-success" /> <br /> Comprar
        // </>,
      ]}
    >
      <Meta className="text-center"
        title={title}
        description={`R$ ${price}`}
      />
    </Card>
    </Link>
  );
};

export default ProductCard;
