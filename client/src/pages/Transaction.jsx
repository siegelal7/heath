import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
// import UserContext from "../contexts/UserContext";

export default function Transaction() {
  const [currentTransaction, setCurrentTransaction] = useState({});
  const [userInfo, setUserInfo] = useState({});
  //   let { id } = useParams();
  const location = useLocation();

  // const theme = useContext(UserContext);

  // useEffect(() => {
  //   const locationState = location?.state;
  //   const trans = locationState?.transaction ? locationState.transaction : null;
  //   if (trans) {
  //     setCurrentTransaction(trans);
  //   }
  //   console.log('theme');
  //   console.log(theme);
  // }, [location]);

  return (
    <>
      <Link to="/" state={{}}>
        Home
      </Link>
      <div>
        <h1>{currentTransaction.transactionName}</h1>
        <p>{currentTransaction.value}</p>
      </div>
    </>
  );
}
