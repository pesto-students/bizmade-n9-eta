import React from "react";
import "../styles.css";
import { Container, Table, Image } from "react-bootstrap";

const ManufacOrderHistory = () => {
  //   const userId = match.params.id;
  //   const dispatch = useDispatch();

  return (
    <div>
      <Container>
        <h2 className="p-4">Manufacturers Orders</h2>
        <Table className="table">
          <thead className="bg-lightblue">
            <tr>
              <th scope="col">Order name</th>
              <th scope="col">Order ID</th>
              <th scope="col">Dealer's name</th>
              <th scope="col">Dealer's Address</th>
              <th scope="col">QTY</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="p-5">
              <td>
                <Image src="" />
                Cooking Oil
              </td>
              <td>#2290</td>
              <td>Ashok Kumar</td>
              <td>D.No. 511/D, Jubilee Heights,Madura Nagar, Delhi - 110001</td>
              <td>1</td>
              <td>2,290</td>
              <td>
                <select
                  class="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>Select Status</option>
                  <option value="1">Processing</option>
                  <option value="2">Delivered</option>
                  <option value="3">Shipped</option>
                </select>
              </td>
            </tr>
            <tr className="p-5">
              <td>
                <Image src="" />
                Whole Wheat
              </td>
              <td>#2305</td>
              <td>Nidhi Pandey</td>
              <td>
                F.No. 424, Hasini Apartments,Gandhi Nagar, Calcutta - 700001
              </td>
              <td>1</td>
              <td>3,290</td>
              <td>
                <select
                  class="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>Select Status</option>
                  <option value="1">Processing</option>
                  <option value="2">Delivered</option>
                  <option value="3">Shipped</option>
                </select>
              </td>
            </tr>
            <tr className="p-5">
              <td>
                <Image src="" />
                Corn Flakes
              </td>
              <td>#2306</td>
              <td>Krishna Kumar</td>
              <td>
                D.No. 112/F, Jaybheri Apartments,Ambedkar Nagar, Secunderabad -
                500003
              </td>
              <td>2</td>
              <td>3,590</td>
              <td>
                <select
                  class="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>Select Status</option>
                  <option value="1">Processing</option>
                  <option value="2">Delivered</option>
                  <option value="3">Shipped</option>
                </select>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ManufacOrderHistory;
