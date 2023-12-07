import React, { useState, useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import "./Home.css";
import Form from "../components/form/Form";
import axios from "axios";
import Transactions from "../components/transactions/Transactions";

export default function Home() {
  const [moneyShownInAccount, setMoneyShownInAccount] = useState(0);
  const [moneyAfterOwedSubtracted, setMoneyAfterOwedSubtracted] = useState(0);
  const [bankAcctVal, setBankAcctVal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [inputValueShown, setInputValueShown] = useState("");
  const [bankId, setBankId] = useState("");

  useEffect(() => {
    let runBool = false;
    if (!runBool) {
      runBool = true;
      axios
        .get("/api/bankaccounts")
        .then((response) => {
          console.log(response);
          setMoneyShownInAccount(response?.data[0]?.balance);
          setBankAcctVal(response?.data[0]?.balance);
          setBankId(response?.data[0]?._id);
        })
        .catch((error) => {
          console.log(error);
        });
      // }

      // if (transactions.length === 0) {
      axios
        .get("/api/transactions")
        .then((response) => {
          console.log(response);
          setTransactions(response?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    let placeholder = moneyShownInAccount;
    for (let i = 0; i < transactions.length; i++) {
      const iterElement = transactions[i];
      const valNumber = parseInt(placeholder) - parseInt(iterElement?.value);
      placeholder = valNumber;
    }
    setMoneyAfterOwedSubtracted(placeholder);
  }, [transactions]);

  const handleSubmit = (event, moneyShown) => {
    event.preventDefault();
    console.log("hi");
    setMoneyShownInAccount(moneyShown);
    console.log(moneyShownInAccount);
    // const finalVal = parseInt(moneyShown) - parseInt(moneyOwed);
    // setMoneyAfterOwedSubtracted(finalVal);
    axios
      .post("/api/bankaccount/create", {
        accountName: "testing123",
        balance: moneyShown,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  const handleTransactionSubmit = (event, transValue) => {
    event.preventDefault();
    console.log("other");
    axios
      .post("/api/transaction/create", {
        transactionName: "123yoraybe",
        value: transValue,
        fromBank: bankId,
      })
      .then((response) => {
        console.log(response);
        setTransactions([...transactions, response.data]);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  return (
    <div className="container">
      <Dashboard
        moneyShownInAccount={moneyShownInAccount}
        moneyAfterOwedSubtracted={moneyAfterOwedSubtracted}
      ></Dashboard>
      <Form
        handleSubmit={handleSubmit}
        label="Shown Bank Balance"
        name="inputValueFake"
        buttonLabel="Submit"
        inputBankVal={bankAcctVal}
        value={inputValueShown}
        setValue={setInputValueShown}
      ></Form>
      <Form
        handleSubmit={handleTransactionSubmit}
        label="Submit a transaction"
        name="transaction"
        buttonLabel="Add transaction"
      ></Form>
      <Transactions iterList={transactions}></Transactions>
    </div>
  );
}
