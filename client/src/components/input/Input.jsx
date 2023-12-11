import React, { useState, useEffect }  from 'react';

export default function Input({handleSubmit,type, inputBankVal, label, name, buttonLabel}) {
  // const [inputValueFake, setInputValueFake] = useState("");
  // const [inputValueOwed, setInputValueOwed] = useState("");
  const [val, setVal] = useState('');
  
  useEffect(()=>{
    if(inputBankVal){
      setVal(inputBankVal);
    }
  },[]);
  
  const handleInputChange = (e) =>{ 
    if(e.target.name === 'inputValueFake'){
      setVal(e.target.value);
    }
    else if(e.target.name === 'transaction'){
      setVal(e.target.value);
    }
  };

  return (
    <form onSubmit={(e)=>handleSubmit(e, val)}>
      <label>{label}
        <input type={type} name={name} value={val} onChange={handleInputChange} />
        {/* <input type='number' name='inputValueOwed' value={inputValueOwed} onChange={handleInputChange} /> */}
      </label>
      {/* <label>Money owed: 
        <input type='number' name='inputValueOwed' value={inputValueOwed} onChange={handleInputChange} />
      </label> */}
      <button type='submit'>{buttonLabel}</button>
    </form>
  )
}
