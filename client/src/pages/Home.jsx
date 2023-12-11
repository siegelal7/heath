import React, { useState, useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import "./Home.css";
import Input from "../components/input/Input";
import axios from "axios";
import Transactions from "../components/transactions/Transactions";
import UserContext from "../contexts/UserContext";
import { useLocation,Link } from "react-router-dom";

export default function Home() {
  const [moneyShownInAccount, setMoneyShownInAccount] = useState(0);
  const [moneyAfterOwedSubtracted, setMoneyAfterOwedSubtracted] = useState(0);
  const [bankAcctVal, setBankAcctVal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [inputValueShown, setInputValueShown] = useState("");
  const [bankId, setBankId] = useState("");
  const [userObj, setUserObj] = useState({
    token: "",
    user: { id: "", name: "", userName: "", email: "" },
  });
  let location = useLocation();

  //fetch bank account and transactions
  useEffect(() => {
    if (location?.state && location.state?.loginResponse) {
      //fetch bank acount
      axios
        .get(`/api/bankaccounts/${location.state.loginResponse.user.id}`)
        .then((response) => {
          console.log("response from get bankaccounts");
          console.log(response);
          if (response.status === 200 || response.status === 304) {
            setMoneyShownInAccount(response?.data?.balance);
            setBankAcctVal(response?.data?.balance);
            setBankId(response?.data?._id);
            //fetch transactions for this bankaccount
            axios
              .get(`/api/transactions/${response?.data?._id}`)
              .then((response) => {
                console.log("response from get transactions");
                console.log(response);
                setTransactions(response?.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    let placeholder = moneyShownInAccount;
    for (let i = 0; i < transactions?.length; i++) {
      const iterElement = transactions[i];
      const valNumber = parseInt(placeholder) - parseInt(iterElement?.value);
      placeholder = valNumber;
    }
    setMoneyAfterOwedSubtracted(placeholder);
  }, [transactions]);

  useEffect(() => {
    console.log("location.state");

    if (location?.state && location.state?.loginResponse) {
      console.log(location.state);
      setUserObj(location.state.loginResponse);
    }
  }, [location]);

  const handleSubmitBankAccount = (event, moneyShown) => {
    event.preventDefault();

    if (userObj?.user?.id) {
      setMoneyShownInAccount(moneyShown);

      axios
        .post("/api/bankaccount/create", {
          accountName: "testing123",
          balance: moneyShown,
          user: userObj.user.id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error " + error);
        });
    }
  };

  const handleTransactionSubmit = (event, transValue) => {
    event.preventDefault();
    
    if (bankId && userObj?.user && userObj.user?.id) {
      axios
        .post("/api/transaction/create", {
          transactionName: "123yoraybe",
          value: transValue,
          fromBank: bankId,
          fromUser: userObj.user.id,
        })
        .then((response) => {
          console.log(response);
          setTransactions([...transactions, response.data]);
        })
        .catch((error) => {
          console.log("error " + error);
        });
    }
  };

  return (
    <UserContext.Provider value={userObj}>
      <div className="container">
        <Link to='/login'>Login</Link>
        <Link to='/logout'>Logout</Link>
        <Dashboard
          moneyShownInAccount={moneyShownInAccount}
          moneyAfterOwedSubtracted={moneyAfterOwedSubtracted}
        ></Dashboard>
        <Input
          handleSubmit={handleSubmitBankAccount}
          label="Shown Bank Balance"
          name="inputValueFake"
          type="number"
          buttonLabel="Submit"
          inputBankVal={bankAcctVal}
          value={inputValueShown}
          setValue={setInputValueShown}
        ></Input>
        <Input
          handleSubmit={handleTransactionSubmit}
          label="Submit a transaction"
          type="number"
          name="transaction"
          buttonLabel="Add transaction"
        ></Input>
        <Transactions iterList={transactions}></Transactions>
      </div>
    </UserContext.Provider>
  );
}
