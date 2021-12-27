import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form inline className="d-flex m-auto" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="q"
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type="submit" variant="primary" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default Search;
