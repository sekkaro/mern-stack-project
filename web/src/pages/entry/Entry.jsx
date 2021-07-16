import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import LoginForm from "../../components/login/LoginForm";
import PasswordResetForm from "../../components/password-reset/PasswordResetForm";

import "./entry.css";

const Entry = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoad, setFormLoad] = useState("login");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const onLoginHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Fill up all the form!");
      return;
    }

    // todo call api to submit the form
    console.log(email, password);
  };

  const onPasswordResetHandler = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter the email");
      return;
    }

    // todo call api to submit the form
    console.log(email);
  };

  const switchForm = (formType) => {
    setFormLoad(formType);
  };

  return (
    <div className="entry-page bg-info">
      <Jumbotron className="form-box">
        {formLoad === "login" && (
          <LoginForm
            onChange={onChangeHandler}
            email={email}
            password={password}
            onSubmit={onLoginHandler}
            switchForm={switchForm}
          />
        )}
        {formLoad === "reset" && (
          <PasswordResetForm
            onChange={onChangeHandler}
            email={email}
            onSubmit={onPasswordResetHandler}
            switchForm={switchForm}
          />
        )}
      </Jumbotron>
    </div>
  );
};

export default Entry;
