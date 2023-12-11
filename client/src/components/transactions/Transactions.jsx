import React from 'react';

export default function Transactions({iterList}) {
  return (
    <div>
        <ul>
            {iterList && iterList.length !== 0 && iterList.map(function(i){
                    return <li key={ i._id }>{i.value}</li>;
                  })}
        </ul>
    </div>
  )
}
