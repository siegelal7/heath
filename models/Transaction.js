const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  transactionName: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  fromBank: { type: Schema.Types.ObjectId, ref: "BankAccount" },
  fromUser: { type: Schema.Types.ObjectId, ref: "User" }
//   owed:{

//   }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;