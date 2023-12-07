import React, { useState, useEffect }  from 'react';

export default function Form({handleSubmit, inputBankVal}) {
  const [inputValueFake, setInputValueFake] = useState("");
  const [inputValueOwed, setInputValueOwed] = useState("");
  
  useEffect(()=>{
    if(inputBankVal){
      setInputValueFake(inputBankVal);
    }
  },[inputBankVal]);
  
  const handleInputChange = (e) =>{
    
    if(e.target.name === 'inputValueFake'){
      setInputValueFake(e.target.value);
    }
    else if(e.target.name === 'inputValueOwed'){
      setInputValueOwed(e.target.value);
    }
  }

  return (
    <form onSubmit={(e)=>handleSubmit(e, inputValueFake, inputValueOwed)}>
      <label>Money shown in account: 
        <input type='number' name='inputValueFake' value={inputValueFake} onChange={handleInputChange} />
        {/* <input type='number' name='inputValueOwed' value={inputValueOwed} onChange={handleInputChange} /> */}
      </label>
      <label>Money owed: 
        <input type='number' name='inputValueOwed' value={inputValueOwed} onChange={handleInputChange} />
      </label>
      <button type='submit'>See the truth</button>
    </form>
  )
}
