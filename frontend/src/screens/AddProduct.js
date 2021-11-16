import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles.css";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Resizer from "react-image-file-resizer";

const AddProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isManufacturer) {
      history.push("/login");
    }

    if (successCreate) {
      history.push("/");
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo, successCreate]);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const image = await resizeFile(file);
    const formData = new FormData();
    console.log(image);
    formData.append("image", image);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const createProductHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        user: userInfo._id,
        name,
        price,
        image,
        manufacturer: userInfo.name,
        category,
        description,
        countInStock,
        minQuantity,
        maxQuantity,
      })
    );
  };

  return (
    <div>
      <Container>
        <h2 className="p-4">Add Product</h2>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}

        <Form onSubmit={createProductHandler}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-1" controlId="name">
                <Form.Label className="float-start fw-bold">Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  rows={1}
                  cols={2}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="price">
                <Form.Label className="float-start fw-bold">Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  rows={1}
                  cols={2}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="description">
                <Form.Label className="float-start fw-bold">
                  Description
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={1}
                  cols={2}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="minquantity">
                <Form.Label className="float-start fw-bold">
                  Min. Quantity
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Minimum Quantity"
                  rows={1}
                  cols={2}
                  value={minQuantity}
                  onChange={(e) => setMinQuantity(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-1" controlId="countInStock">
                <Form.Label className="float-start fw-bold">
                  Count In Stock
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  rows={1}
                  cols={2}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="category">
                <Form.Label className="float-start fw-bold">Category</Form.Label>
                  <Form.Select 
                  onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select Category</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Home">Home</option>
                    <option value="Beauty">Beauty and Personal care</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Machinery">Machinery</option>
                  </Form.Select>
                
              </Form.Group>
              <Form.Group controlId="image" className="mb-1">
                <Form.Label className="float-start fw-bold">Image</Form.Label>
                <Form.Control
                  type="file"
                  id="image-file"
                  label="choose File"
                  custom
                  onChange={uploadFileHandler}
                ></Form.Control>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group className="mb-1" controlId="maxquantity">
                <Form.Label className="float-start fw-bold">
                  Max. Quantity
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Maximum Quantity"
                  rows={1}
                  cols={2}
                  value={maxQuantity}
                  onChange={(e) => setMaxQuantity(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="m-4">
            Save Changes
          </Button>
          <Link to="/">
            <Button variant="primary" type="submit" className="m-4">
              Cancel
            </Button>
          </Link>
        </Form>
      </Container>
    </div>
  );
};

export default AddProduct;
