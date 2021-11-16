import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../styles.css";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="card-img-top" />
      </Link>

      <Card.Body className="text-left">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="card-title"
          style={{ color: "#0fafe9", fontSize: "medium", fontWeight: "500" }}>
          <h4><strong>{product.name}</strong></h4>
          </Card.Title>
        </Link>
        <Card.Text
           style={{ color: "#0fafe9", fontSize: "medium", fontWeight: "500" }}
          as="h4"
        >
          {product.manufacturer}
        </Card.Text>
        <Card.Text
          style={{ color: "#3B3B3B", fontSize: "medium", fontWeight: "500" }}
          as="h3"
        >
          &#8377;<strong>{product.price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
