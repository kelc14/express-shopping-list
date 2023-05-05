process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDB");

let item1 = { name: "Popsicle", price: 1.99 };

// ** BEFORE each test, add one item, after each test, remove all items

beforeEach(function () {
  items.push(item1);
});

afterEach(function () {
  items.length = 0;
});

// ** END

/** GET /items - returns `[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]` */

describe("GET /items", function () {
  test("Gets a list of all items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ items });
  });
});

describe("POST /items", function () {
  test("Add an item to the database", async function () {
    const resp = await request(app).post(`/items`).send({
      name: "Pringles",
      price: 1.05,
    });
    expect(resp.statusCode).toBe(201);

    expect(resp.body).toEqual({
      added: {
        name: "Pringles",
        price: 1.05,
      },
    });
  });
});

describe("GET /items/:name", function () {
  test("Gets details about one specific item", async function () {
    const resp = await request(app).get(`/items/${item1.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ foundItem: item1 });
  });
});

describe("PATCH /items/:name", function () {
  test("Edit details about one specific item", async function () {
    const resp = await await request(app)
      .patch(`/items/${item1.name}`)
      .send({ name: "Lollipops" });
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({
      updated: {
        name: "Lollipops",
        price: 1.99,
      },
    });
  });
});

describe("DELETE /items/:name", function () {
  test("Delete one specific item", async function () {
    const resp = await await request(app).delete(`/items/${item1.name}`);

    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ message: "Deleted" });
  });
});
