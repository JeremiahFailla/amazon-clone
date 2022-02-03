import React from "react";
import "./Product.css";
import StarIcon from "@mui/icons-material/Star";

const Product = ({ title, image, price, rating }) => {
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>
            $<strong>{price}</strong>
          </small>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarIcon />
              </p>
            ))}
        </div>
      </div>
      <img src={image} />
      <button>Add to Basket</button>
    </div>
  );
};

export default Product;
