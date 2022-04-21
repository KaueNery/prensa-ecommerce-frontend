import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    description,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <>
    <p>{description}</p>

        Preço:{" "}
        <span className="float-right text-success">
          ${price}
        </span>

        {category && (
                <>
                <br/>
                Categoria:{" "}
                <Link
                    to={`/category/${category.slug}`}
                    className="label label-default label-pill pull-xs-right"
                >
                    {category.name}
                </Link>

                </>
        )}

        {subs && (
            <>
            <br/>
            Sub Categorias: {" "}
            {subs.map((s) => (
                <Link
                key={s._id}
                to={`/sub/${s.slug}`}
                className=" float-right"
                >
                    {s.name}
                </Link>
            ))}
            </>
        )}
       
        
      


      

    {/* 
      {subs && (
        <li className="list-group-item">
          Sub Categories
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className=" float-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li> */}
    </>
  );
};

export default ProductListItems;
