"use strict";

const request = require("supertest");
const app = require("./app");
let db = require("./fakeDb");

let pickle = { name: "Pickle", price: 1.85 };

beforeEach(function() {
  db.items.push(pickle);
});

afterEach(function() {
  db.items = [];
});

/** */
describe("GET /items", function() {
  it("Gets a list of shopping list", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [pickle] });
  });
});

/**this test adding item to the db.items array */
describe("POST /items", function() {
  it("Creates a new item in shopping list", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "chocolate bar",
        price: "3.99"
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: {
        name: "chocolate bar",
        price: "3.99"
      }
    });
    expect()
  });
});