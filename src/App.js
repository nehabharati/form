import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { Tooltip, Overlay } from "react-bootstrap";

function App() {
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const target = useRef(null);

  function handleEmailValidation(e) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regex.test(e.target.value)) {
      const url = "https://api.raisely.com/v3/check-user";
      const emailValidation = {
        campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
        data: {
          email: e.target.value,
        },
      };

      axios.post(url, emailValidation).then((res) => {
        console.log(res);
        if (res.data.data.status === "EXISTS") {
          setEmailMessage("Email already exists");
        }
      });
      setEmail(e.target.value);
      setEmailMessage("");
    } else {
      setEmailMessage("Please enter valid email");
    }
  }

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);

  const handlePasswordValidation = (e) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (regex.test(e.target.value)) {
      setPassword(e.target.value);
      setPasswordMessage("");
    } else {
      setPasswordMessage("Please fulfill the password requirements");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formDetails = {
      campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    };
    const url = "https://api.raisely.com/v3/signup";
    if (firstName && lastName && email && password) {
      let data = JSON.stringify(formDetails);
      axios.post(url, formDetails).then((res) => console.log(res));
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: "1em" }}>Sign up</h2>
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          onChange={handleFirstName}
        />
        <label>Last Name</label>
        <input type="text" placeholder="Last Name" onChange={handleLastName} />
        <label>Email</label>
        <input
          type="email"
          onBlur={handleEmailValidation}
          placeholder="Email"
        />
        <small
          style={{
            display: emailMessage ? "block" : "none",
            color: emailMessage ? "#ff4000" : "none",
            marginTop: emailMessage ? "-2em" : 0,
            marginBottom: emailMessage ? "2em" : 0,
            fontSize: emailMessage ? "0.7rem" : 0,
          }}
        >
          {emailMessage}
        </small>
        <label>Password</label>
        <input
          type="password"
          onChange={handlePasswordValidation}
          onFocus={() => setShow(!show)}
          ref={target}
          placeholder="Password"
        />
        <small
          style={{
            display: passwordMessage ? "block" : "none",
            color: passwordMessage ? "#ff4000" : "none",
            marginTop: passwordMessage ? "-2em" : 0,
            marginBottom: passwordMessage ? "2em" : 0,
            fontSize: passwordMessage ? "0.7rem" : 0,
          }}
        >
          {passwordMessage}
        </small>
        <Overlay target={target.current} show={show} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              Password should be 8 characters long, <br />
              contain special characters,
              <br /> capital letters and small letters
            </Tooltip>
          )}
        </Overlay>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
