import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
// import products from "../products";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { loading, error, products } = productTopRated;

  const products1 = [
    {
      _id: '6197983a5748296a34a2498b',
      name: 'Nike Sports Shoes',
      image: 'https://bizmade.s3.amazonaws.com/nike shoe.JPEG',
    },
    {
      _id: '6196a8cecb5e40fe59dbf513',
      name: 'Yoga Mat',
      image: 'https://bizmade.s3.amazonaws.com/mat.JPEG',
    },
    {
      _id: '6193b63f8551cb0c4fcbd942',
      name: "Men's Hoodie Off Big V Pullover",
      image: '/uploads\\image-1637070391554.JPEG',
    },
  ];
  {
    /*useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);*/
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      pause="hover"
      className="bg-dark carousel"
      style={{ width: 'auto' }}>
      {products1.map(product => (
        <Carousel.Item key={product._id} style={{ height: '300px' }}>
          <Link to={`/product/${product._id}`}>
            <img
              className="d-block carousel"
              src={product.image}
              alt={product.name}
            />
            {/* <Carousel.Caption className="carousel-caption">
              <h2 style={{ color: "#0fafe9" }}>
                <strong>
                  {product.name} (&#8377;{product.price})
                </strong>
              </h2>
            </Carousel.Caption> */}
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
