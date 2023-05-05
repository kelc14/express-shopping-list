const express = require("express");
const router = new express.Router();
const ExpressError = require("./ExpressError");
const items = require("./fakeDB");

router.get("/", function (req, res) {
  res.json({ items });
});

router.post("/", function (req, res) {
  if (!req.body.name) {
    throw new ExpressError("'name' is a required parameter", 400);
  }
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

router.get("/:name", function (req, res) {
  let findName = req.params.name;
  const foundItem = items.find((x) => x.name === findName);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  res.json({ foundItem });
});

router.patch("/:name", function (req, res) {
  let findName = req.params.name;
  const foundItem = items.find((x) => x.name === findName);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  res.json({ updated: foundItem });
});

router.delete("/:name", function (req, res) {
  let findName = req.params.name;
  const foundItem = items.find((x) => x.name === findName);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  items.splice(foundItem, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
