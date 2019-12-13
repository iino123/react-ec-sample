import React from "react";
import "./collection-item.style.scss";
import CustonButton from "../custom-button/custom-button.component";

const CollectionItem = ({ id, name, price, imageUrl }) => (
  <div className="collection-item">
    <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
    <div className="collection-footer">
      <span className="name">{name}</span>
      <span className="price">{price}</span>
    </div>
    <CustonButton inverted> Add to Cart </CustonButton>
  </div>
);

export default CollectionItem;
