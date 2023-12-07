const router = require("express").Router();
const db = require("../models");
const auth = require("../middleware/auth");

router.get("/api/transactions", (req, res) => {
  db.Transaction.find({})
    // .populate("transactions")
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/transaction/create", ({ body }, res) => {
  db.Transaction.create(body)
    .then((newTransaction) => {
      res.json(newTransaction);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


module.exports = router;
