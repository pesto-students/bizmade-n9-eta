import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import "./HomeScreen.css";
import ProductCarousel from "../components/ProductCarousel";

import { useDispatch, useSelector } from "react-redux";
import ManufacLandingPage from "./ManufacLandingPage";
import {
  listProducts,
  listManufacturerProducts,
} from "../actions/productActions";
import Paginate from "../components/Paginate";

function HomeScreen({ match, history }) {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchedProducts = async () => {
  //     const { data } = await axios.get("/api/products");
  //     setProducts(data);
  //   };
  //   fetchedProducts();
  // }, []);

  // const products = []
  // const loading = true
  // const error = null
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => {
    return state.productList;
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { loading, error, products, page, pages } = productList;

  // const userList = useSelector((state) => state.userList);

  useEffect(() => {
    if (userInfo && userInfo.isManufacturer) {
      dispatch(listManufacturerProducts(userInfo.name));
    } else {
      dispatch(listProducts(keyword, pageNumber));
    }
  }, [dispatch, keyword, pageNumber]);

  const categoriesArray = [];
  const categories = () => {
    products.map((p) => {
      categoriesArray.push(p.category);
      console.log(p.category);

      return categoriesArray;
    });
  };
  categories();
  console.log(categoriesArray);

  const categoryHandler = (e) => {
    const keyword = e.target.dataset.value;
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <>
      {userInfo && userInfo.isManufacturer ? (
        loading ? (
          <Col className="col-10">
            <h2>Loading...</h2>
          </Col>
        ) : error ? (
          <Col className="col-10">
            <h3>{error}</h3>
          </Col>
        ) : (
          <ManufacLandingPage
            products={products}
            manufacturer={userInfo.name}
          />
        )
      ) : (
        <>
          <ProductCarousel />
          <Row>
            {loading ? (
              <Col className="col-10" md={9}>
                <h2>Loading...</h2>
              </Col>
            ) : error ? (
              <Col className="col-10" md={9}>
                <h3>{error}</h3>
              </Col>
            ) : (
              //can give error boundary here becuase product_list_fail is called after 'product is not defined' error is thrown (when case:PRODUCT_LIST_SUCCESS is returning wrong values),
              //so product is assigned with empty array after that when code in product reducer case:PRODUCT_LIST_FAIL is runs
              <>
                <Row>
                  <Col md={3}>
                    <div id="homepage-container">
                      <div className="carousal"></div>
                      <div className="products-list"></div>
                      <div className="filter">
                        <div className="header">Browse Categories</div>
                        <div
                          className="all"
                          name="fq"
                          data-value="all"
                          onClick={() => {
                            history.push("/");
                          }}
                        >
                          All
                        </div>
                        <div
                          className="clothes"
                          name="fq"
                          data-value="Clothing"
                          onClick={(e) => categoryHandler(e)}
                        >
                          Clothing
                        </div>
                        <div
                          className="electronics"
                          name="fq"
                          data-value="Electronics"
                          onClick={(e) => categoryHandler(e)}
                        >
                          Electronics
                        </div>
                        <div
                          className="healthcare"
                          name="fq"
                          data-value="healthcare"
                          onClick={(e) => categoryHandler(e)}
                        >
                          Healthcare
                        </div>
                        <div
                          className="machinery"
                          name="fq"
                          data-value="machinery"
                          onClick={(e) => categoryHandler(e)}
                        >
                          Machinery
                        </div>
                        <div
                          className="entertainment"
                          name="fq"
                          data-value="entertainment"
                          onClick={(e) => categoryHandler(e)}
                        >
                          Entertainment
                        </div>
                        <div
                          className="home"
                          name="fq"
                          data-value="home"
                          onClick={(e) => categoryHandler(e)}
                        >
                          Home and Garden
                        </div>
                        <div
                          className="beauty"
                          name="fq"
                          data-value="beauty"
                          onClick={(e) => categoryHandler(e)}
                        >
                          Beauty and Personal care
                        </div>
                      </div>
                    </div>
                  </Col>
                  {products.map((product) => (
                    <Col key={product._id} sm={12} md={9} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </>
            )}
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen;
