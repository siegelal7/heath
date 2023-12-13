import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Transactions({iterList}) {
  const navigate = useNavigate();

  const handleRedirect = (event, i) => {
    console.log(event.target.dataset);
    navigate(`transaction/${event.target.dataset.id}`, {state:{transaction:i}});
  };
  return (
    <div>
        <ul>
            {iterList && iterList.length !== 0 && iterList.map(function(i){
                    return <li key={ i._id } data-id={i._id} onClick={(e) =>handleRedirect(e,i)}>{i.value}</li>;
                  })}
        </ul>
    </div>
  )
}
