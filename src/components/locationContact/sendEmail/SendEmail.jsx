import React, { useState } from "react";
import { Form , Button } from "react-bootstrap";
import RobotBox from "../../ReCAPTCHA/RobotBox";
import "bootstrap-icons/font/bootstrap-icons.css";
import { userSendMessage } from "../function/SendMailUser";


function SendEmail(props) {


  let storedTheme = localStorage.getItem("theme");

  const [toSend, setToSend] = useState({
    reply_to: "",
    message: "",
  });

    
  // check box if user not robot
  const [capVal, setCapVal] = useState(false);

    
  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

    
  //send meesage to admin Gmail use EmailJS ,and check value
  const sendMessage = () => {
    userSendMessage(toSend, () => setCapVal(false));
  };

    
    
  return (
    <div
      className={
        storedTheme === "light"
          ? "cardModelSendEmailDark"
          : storedTheme === "dark"
          ? "cardModelSendEmail"
          : ""
      }
    >
      <div className="closeModelSendMessage">
        <Button
          style={
            storedTheme === "light"
              ? { background: "#424242" }
              : storedTheme === "dark"
              ? { background: "white" }
              : ""
          }
          variant=""
          onClick={props.hideModelSendMessage}
        >
          <i
            style={
              storedTheme === "light"
                ? { fontSize: "20px", color: "white" }
                : storedTheme === "dark"
                ? { fontSize: "20px", color: "black" }
                : ""
            }
            className="bi bi-x-lg"
          ></i>
        </Button>
      </div>

      <div className="titleSendEmail">
        <h1
          style={
            storedTheme === "light"
              ? { color: "#ffffffab" }
              : storedTheme === "dark"
              ? { color: "gray" }
              : ""
          }
        >
          Send Message{" "}
          <img
            style={{ height: "30px" }}
            src="https://i.postimg.cc/fyxJYP8q/99.webp"
            alt="email"
          />
        </h1>
      </div>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="email"
          name="reply_to"
          placeholder="Your Email"
          value={toSend.reply_to}
          onChange={handleChange}
          autoFocus
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          as="textarea"
          rows={3}
          name="message"
          placeholder="Your Message"
          value={toSend.message}
          onChange={handleChange}
        />
      </Form.Group>

      {/* check box if user don't robot */}
      <div style={{ marginTop: "8%" }}>
        <RobotBox activeRobotBox={() => setCapVal(true)} />
      </div>

      <div className="buttonSendMessage">
        <Button
          style={!capVal ? { cursor: "not-allowed" } : {}}
          onClick={sendMessage}
          disabled={!capVal}
          variant="success"
        >
          Send Message
        </Button>
      </div>
    </div>
  );
}


export default SendEmail;