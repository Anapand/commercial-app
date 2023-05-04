import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.product.data;
  });

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetch("https://fakestoreapi.com/products");
      const result = await data.json();
      dispatch(fetchProducts(result));
    };
    getProducts();
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="row">
        {products?.map((product) => (
          <div className="col-md-3" style={{ marginBottom: "10px" }}>
            <Card key={product.id} className="h-100">
              <div className="text-center">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ width: "100px", height: "130px" }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>INR{product.price}</Card.Text>
                </Card.Body>
              </div>
              <Card.Footer style={{ backgroundColor: "white" }}>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
