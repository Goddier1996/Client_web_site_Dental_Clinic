import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { alertPopUpIfUserHaveTodayTurn } from "../../../addAppointment/function/AlertUserHaveTurnToday";
import { CheckInputValueUpdateDataUser } from "../function/UserProfileFunction";
import LazyLoadImg from "../../../tools/lazyLoad/LazyLoadImg";


const PersonalData = ({ data_user }) => {


  let storedTheme = localStorage.getItem("theme");
  let history = useHistory();

  const [Login, setLogin] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");



  const CheckValueAndUpdateDataUser = async () => {
    let dataUser = {
      User_Login: Login,
      FirstName: FirstName,
      Email: Email,
      Birthday: Birthday,
      User_password: Password,
      ConfirmPassword: ConfirmPassword,
      Day_date: data_user.day,
      Hour_day: data_user.hour,
      Serial_codeHour: data_user.codeHour,
      UserType_code: "1",
    };


    CheckInputValueUpdateDataUser(
      dataUser,
      data_user.login,
      data_user.code,
      history
    );
  };


  const alertTodayTurnUser = async () => {
    await alertPopUpIfUserHaveTodayTurn(
      data_user.day,
      storedTheme,
      data_user.hour,
      data_user.codeHour,
      data_user.code
    );
  };


  useEffect(() => {
    alertTodayTurnUser();

    //show use date- when i update user date i show all value in input and choise what i need update
    setFirstName(data_user.name);
    setLogin(data_user.login);
    setEmail(data_user.email);
    setBirthday(data_user.birthday);
    setPassword(data_user.password);
    setConfirmPassword(data_user.confirm_password);
  }, []);


  
  return (
    <>
      <div className="updatedDataUser">
        <LazyLoadImg
          type=""
          img="https://i.postimg.cc/QtwhP3jw/personal-data.png"
          width=""
          height="95"
          alt="Updated Data User"
        />
      </div>

      <Form>
        <Row>
          <Form.Group as={Col} md="4" className="personalDataPlaceFree">
            <Form.Label
              className={
                storedTheme === "light"
                  ? "colorTextDark"
                  : storedTheme === "colorText"
                  ? ""
                  : ""
              }
            >
              Login
            </Form.Label>

            <Form.Control
              value={Login}
              type="text"
              onChange={(event) => setLogin(event.target.value)}
              style={{
                backgroundColor: "white",
                fontWeight: "600",
                color: "#00000071",
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" className="personalDataPlaceFree">
            <Form.Label
              className={
                storedTheme === "light"
                  ? "colorTextDark"
                  : storedTheme === "colorText"
                  ? ""
                  : ""
              }
            >
              First Name
            </Form.Label>

            <Form.Control
              placeholder="Enter email"
              type="text"
              value={FirstName}
              onChange={(event) => setFirstName(event.target.value)}
              style={{
                backgroundColor: "white",
                fontWeight: "600",
                color: "#00000071",
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" className="personalDataPlaceFree">
            <Form.Label
              className={
                storedTheme === "light"
                  ? "colorTextDark"
                  : storedTheme === "colorText"
                  ? ""
                  : ""
              }
            >
              Email
            </Form.Label>

            <Form.Control
              placeholder="Enter email"
              type="text"
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
              style={{
                backgroundColor: "white",
                fontWeight: "600",
                color: "#00000071",
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" className="personalDataPlaceFree">
            <Form.Label
              className={
                storedTheme === "light"
                  ? "colorTextDark"
                  : storedTheme === "colorText"
                  ? ""
                  : ""
              }
            >
              Date
            </Form.Label>

            <Form.Control
              placeholder="Enter email"
              type="Date"
              value={Birthday}
              onChange={(event) => setBirthday(event.target.value)}
              style={{
                backgroundColor: "white",
                fontWeight: "600",
                color: "#00000071",
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" className="personalDataPlaceFree">
            <Form.Label
              className={
                storedTheme === "light"
                  ? "colorTextDark"
                  : storedTheme === "colorText"
                  ? ""
                  : ""
              }
            >
              Password
            </Form.Label>

            <Form.Control
              placeholder="Enter email"
              type="Password"
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
              style={{
                backgroundColor: "white",
                fontWeight: "600",
                color: "#00000071",
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" className="personalDataPlaceFree">
            <Form.Label
              className={
                storedTheme === "light"
                  ? "colorTextDark"
                  : storedTheme === "colorText"
                  ? ""
                  : ""
              }
            >
              Confirm Password
            </Form.Label>

            <Form.Control
              placeholder="Confirm Password"
              type="Password"
              value={ConfirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              style={{
                backgroundColor: "white",
                fontWeight: "600",
                color: "#00000071",
              }}
            />
          </Form.Group>
        </Row>

        <div className="enterUpdate">
          <Button variant="success" onClick={CheckValueAndUpdateDataUser}>
            Update
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PersonalData;
