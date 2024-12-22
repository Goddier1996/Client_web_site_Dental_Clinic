import React from "react";
import MessageNotHaveTurnUser from "./MessageNotHaveTurnUser";
import MessageUserHaveTurn from "./MessageUserHaveTurn";


const UserQueues = ({ day, data_user }) => {

  return (
    <>
      {day == null ? (
        <MessageNotHaveTurnUser />
      ) : day != null ? (
        <MessageUserHaveTurn dataUser={data_user} />
      ) : (
        ""
      )}
    </>
  );
};


export default UserQueues;