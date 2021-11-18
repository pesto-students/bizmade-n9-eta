// const request = require("supertest");
// const app = require("../server");
import request from "supertest";
import app from "../backend/server.js";

describe("GET /", () => {
  it("responds with server running", (done) => {
    request(app).get("/").expect("Server running", done);
  });
});
