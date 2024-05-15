import React, { useState, useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import "./Home.css";
import Input from "../components/input/Input";
import axios from "axios";
import Transactions from "../components/transactions/Transactions";
// import UserContext from "../contexts/UserContext";
import {useAuth, UserProvider} from '../contexts/UserContext';
import { useLocation,Link } from "react-router-dom";

export default function Home() {
  const [moneyShownInAccount, setMoneyShownInAccount] = useState(0);
  const [moneyAfterOwedSubtracted, setMoneyAfterOwedSubtracted] = useState(0);
  const [bankAcctVal, setBankAcctVal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [inputValueShown, setInputValueShown] = useState("");
  const [bankId, setBankId] = useState("");
  // const [userObj, setUserObj] = useState({
  //   token: "",
  //   user: { id: "", name: "", userName: "", email: "" },
  // });
  let location = useLocation();

  const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth();

  //fetch bank account and transactions
  useEffect(() => {
    console.log('checks');
    console.log(authUser);
    if (authUser?.user && authUser.user?.id) {
      //fetch bank acount
      axios
        .get(`/api/bankaccounts/${authUser.user.id}`)
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

  const handleSubmitBankAccount = (event, moneyShown) => {
    event.preventDefault();

    if (authUser?.user?.id) {
      setMoneyShownInAccount(moneyShown);

      axios
        .post("/api/bankaccount/create", {
          accountName: "testing123",
          balance: moneyShown,
          user: authUser.user.id,
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
    
    if (bankId && authUser?.user && authUser.user?.id) {
      axios
        .post("/api/transaction/create", {
          transactionName: "123yoraybe",
          value: transValue,
          fromBank: bankId,
          fromUser: authUser.user.id,
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
    <UserProvider value={authUser}>
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
    </UserProvider>
  );
}
