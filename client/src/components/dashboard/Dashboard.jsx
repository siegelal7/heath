import React from 'react';
import './Dashboard.css';

export default function Dashboard({moneyShownInAccount, moneyAfterOwedSubtracted}) {
  return (
    <div className='card'>
        <h1>Current fake balance: {moneyShownInAccount}</h1>
        <h1>Current real balance: {moneyAfterOwedSubtracted}</h1>
    </div>
  )
}
