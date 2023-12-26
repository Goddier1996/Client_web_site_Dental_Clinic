import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AdminInfoVideo } from "../function/SignInUser";
import { LoginUser } from "../../../customHook/customQueryHook";
import { useForm } from "react-hook-form";
import { Form , Button , Spinner } from "react-bootstrap";



const ShowModelFormConnect = ({ activeForgetPassword, hideSignIn }) => {


  let storedTheme = localStorage.getItem("theme");

  // react query
  const { mutate, isLoading: loadingLogin } = LoginUser(hideSignIn);

  const { register, handleSubmit } = useForm();

    
  const signInDemoUser = () => {
    
    let user = {
      User_Login: process.env.REACT_APP_DEMO_USER_NAME,
      User_password: process.env.REACT_APP_DEMO_USER_PASSWORD,
    };

    // send data to reactQuery Hook
    mutate(user);
  };

    
  const signInDemoDoctor = () => {
    
    let user = {
      User_Login: process.env.REACT_APP_DEMO_DOCTOR_NAME || "",
      User_password: process.env.REACT_APP_DEMO_DOCTOR_PASSWORD || "",
    };

    // send data to reactQuery Hook
    mutate(user);
  };

  
  const onSubmitSignIn = (data) => {
    
    // send data to reactQuery Hook
    mutate(data);
  };

    
  const handleError = (errors) => {
    console.log(errors);
  };

    
    
  return (
    <div className="body-form">
      <Form onSubmit={handleSubmit(onSubmitSignIn, handleError)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user"></i>
            </span>
          </div>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Login"
            {...register("User_Login", {
              required: true,
            })}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>
          <Form.Control
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("User_password", {
              required: true,
            })}
          />
        </div>

        <div className="loginInOrCloseButtom">
          {!loadingLogin ? (
            <Button type="submit" variant="primary">
              Login
            </Button>
          ) : (
            <Button variant="primary">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          )}

          <Button
            disabled={loadingLogin}
            variant="secondary"
            onClick={!loadingLogin ? hideSignIn : null}
          >
            Close
          </Button>
        </div>

        <div
          className={
            storedTheme == "light"
              ? "messageDark"
              : storedTheme == "dark"
              ? "message"
              : ""
          }
        >
          <p
            className={loadingLogin ? "isDisabled" : ""}
            onClick={!loadingLogin ? activeForgetPassword : null}
          >
            Forgot your password
          </p>
        </div>

        <div
          className={
            storedTheme == "light"
              ? "borderSpaceDark"
              : storedTheme == "dark"
              ? "borderSpace"
              : ""
          }
        ></div>

        <div
          className={
            storedTheme == "light"
              ? "DemoUserAndDoctorDark"
              : storedTheme == "dark"
              ? "DemoUserAndDoctor"
              : ""
          }
        >
          <p>
            Connect Demo
            <a
              className={loadingLogin ? "isDisabled" : ""}
              onClick={!loadingLogin ? signInDemoUser : null}
            >
              {" "}
              User
            </a>{" "}
            or
            <a
              className={loadingLogin ? "isDisabled" : ""}
              onClick={!loadingLogin ? signInDemoDoctor : null}
            >
              {" "}
              Doctor
            </a>
          </p>
        </div>

        <div
          className={
            storedTheme == "light"
              ? "infoVideoAAdminDark"
              : storedTheme == "dark"
              ? "infoVideoAAdmin"
              : ""
          }
        >
          <a onClick={AdminInfoVideo}>Click See What Admin can to do !</a>
        </div>
      </Form>
    </div>
  );
};


export default ShowModelFormConnect;