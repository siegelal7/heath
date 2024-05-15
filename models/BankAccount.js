const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BankAccountSchema = new Schema({
  accountName: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
  },
  // transactions: [{type: Schema.Types.ObjectId, ref: "Transaction" }],
  user: {type: Schema.Types.ObjectId, ref: "User"},
//   owed:{

//   }
});

const BankAccount = mongoose.model("BankAccount", BankAccountSchema);

module.exports = BankAccount;