import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Transaction({ transaction }) {
  const [currentTransaction, setCurrentTransaction] = useState({});
  //   let { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const locationState = location?.state;
    const trans = locationState?.transaction ? locationState.transaction : null;
    if (trans) {
      setCurrentTransaction(trans);
    }
  }, [location]);

  return (
    <>
    <Link to="/">Home</Link>
    <div>
      <h1>{currentTransaction.transactionName}</h1>
      <p>{currentTransaction.value}</p>
    </div>
    </>
  );
}
