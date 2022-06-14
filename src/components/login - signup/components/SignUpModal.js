import React, { useState } from "react";
import Button from "../../Button";
import InputField from "./InputField";
import { MdClose } from "react-icons/md";
import { isEmail } from "validator";
import Loader from "../../Loader";

export default function SignUpModal({ visible, toggleModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const emailValidation = (email) => {
    const emailCheck = isEmail(email);
    return emailCheck;
  };

  const register = (name, email, password) => {
    if (email.length == 0 || password.length == 0 || name.length == 0) {
      setMessage("Fields cannot be empty");
      return;
    }

    setMessage("");

    if (!emailValidation(email)) {
      setEmailError(true);
      setEmailMessage("Please enter a valid email");
      return;
    }

    setLoading(true);

    const data = {
      name: name,
      email: email,
      password: password,
    };

    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "Already exists") {
          setMessage("Success");
          setLoading(false);

          setTimeout(() => {
            toggleModal();
            setMessage("");
            setEmail("");
            setPassword("");
            setName("");
          }, 2000);
        } else {
          setLoading(false);
          setMessage("User already exists");
        }
      })
      .catch((error) => {
        setMessage("There is an error.");
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const closeIcon = () => {
    return (
      <MdClose
        onClick={toggleModal}
        className="absolute top-1 right-1 md:top-4 md:right-4 text-2xl hover:cursor-pointer"
      ></MdClose>
    );
  };

  return (
    <div
      className={
        visible +
        " fixed w-screen h-screen top-0 left-0 flex flex-col justify-center items-center"
      }
    >
      <div className="absolute w-full h-full bg-orange-900 opacity-50"></div>
      <div className="m-2 bg-orange-100 space-y-4 z-10 rounded shadow-slate-700 shadow-sm flex flex-col md:px-20 md:py-10 py-6 relative px-4">
        {closeIcon()}
        <p className="text-xl border-b border-black text-center">
          Please enter the required information to sign up
        </p>
        <InputField
          label={"Name"}
          type={"text"}
          placeholder={"name"}
          value={name}
          changeHandler={handleNameChange}
        ></InputField>
        <InputField
          label={"Email"}
          type={"email"}
          placeholder={"email"}
          value={email}
          changeHandler={handleEmailChange}
          valid={emailError}
          errorMessage={emailMessage}
        ></InputField>
        <InputField
          label={"Password"}
          type={"password"}
          placeholder={"password"}
          value={password}
          changeHandler={handlePasswordChange}
        ></InputField>
        <div className="flex justify-center">
          {loading ? (
            <Loader></Loader>
          ) : (
            <Button
              clickHandler={() => register(name, email, password)}
              label={"Sign up"}
            ></Button>
          )}
        </div>
        <div>
          <p className="text-center text-xl">{message}</p>
        </div>
      </div>
    </div>
  );
}
