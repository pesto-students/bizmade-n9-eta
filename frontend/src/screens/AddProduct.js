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
import { baseURL } from "../constants/appConstants";

const AddProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
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

  function checkFileType(file) {
    let fileName = file.name.toString().toLowerCase();
    console.log(fileName);
    const regex = new RegExp("(.*?).(png|jpg|jpeg)$");
    if (!regex.test(fileName)) {
      return false;
    } else {
      return true;
    }
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const fileType = checkFileType(file);
    if (fileType) {
      const image = await resizeFile(file);
      setUploading(true);
      if (image == null) {
        return alert("No file selected.");
      }
      getSignedRequest(image);
    } else {
      alert("Upload Images only");
    }
  };

  function getSignedRequest(file) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `${baseURL}/sign-s3?file-name=${file.name}&file-type=${file.type}`
    );
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr);
          const response = JSON.parse(xhr.responseText);
          uploadFile(file, response.signedRequest, response.url);
        } else {
          alert("Could not get signed URL.");
          setUploading(false);
        }
      }
    };
    xhr.send();
  }

  function uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          setImage(url);
          setUploading(false);
        } else {
          alert("Could not upload file.");
          setUploading(false);
        }
      }
    };
    xhr.send(file);
  }

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
        <h2 className="p-4 fw-bold">Add Product</h2>
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
                <Form.Label className="float-start fw-bold">
                  Category
                </Form.Label>
                <Form.Select onChange={(e) => setCategory(e.target.value)}>
                  <option>Select Category</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Home">Home</option>
                  <option value="Beauty">Beauty and Personal care</option>
                  <option value="Sports">Sports</option>
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
