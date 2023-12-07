import React, { useState }  from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import './Home.css';
import Form from '../components/form/Form';

export default function Home() {
  const [moneyShownInAccount, setMoneyShownInAccount] = useState(0);
  const [moneyAfterOwedSubtracted, setMoneyAfterOwedSubtracted] = useState(0);
  const [bankAcctVal, setBankAcctVal] = useState(0);



  const handleSubmit = (event, moneyShown, moneyOwed) =>{
    event.preventDefault();
    console.log('hi');
    setMoneyShownInAccount(moneyShown);
    console.log(moneyShownInAccount);
    const finalVal = parseInt(moneyShown) - parseInt(moneyOwed);
    setMoneyAfterOwedSubtracted(finalVal);
  }

  return (
    <div className='container'>
      <Dashboard moneyShownInAccount={moneyShownInAccount} moneyAfterOwedSubtracted={moneyAfterOwedSubtracted}></Dashboard>
      <Form handleSubmit={handleSubmit} inputBankVal={bankAcctVal}></Form>
    </div>

  )
}
