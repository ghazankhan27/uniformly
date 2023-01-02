import React, { useState } from "react";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import { MdClose } from "react-icons/md";
import { isEmail, isEmpty } from "validator";
import Loader from "../../../components/Loader";

export default function SignUpModal({ visible, toggleModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const removeErrorMessages = () => {
    if (emailError !== false) setEmailError(false);
    if (passwordErrors !== false) setPasswordErrors(false);
    if (message !== null) setMessage(null);
  };

  const emailValidation = (email) => {
    const emailCheck = isEmail(email);
    return emailCheck;
  };

  const passwordValidation = (password) => {
    const passwordCheck = !isEmpty(password) && password.length >= 6;

    if (passwordCheck) {
      setPasswordErrors(false);
      return true;
    }

    setPasswordErrors(true);
    return false;
  };

  const register = async (name, email, password) => {
    removeErrorMessages();

    if (email.length === 0 || password.length === 0 || name.length === 0) {
      setMessage("Fields cannot be empty");
      return;
    }

    if (!emailValidation(email)) {
      setEmailError(true);
      return;
    }

    if (!passwordValidation(password)) {
      setPasswordErrors(true);
      return;
    }

    setLoading(true);

    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status !== 201) {
        setMessage("User already exists");
        return;
      }

      setMessage("Success");

      setTimeout(() => {
        removeErrorMessages();
        clearInputs();
        toggleModal();
      }, 500);
    } catch {
      setMessage("There is an error.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event) => {
    removeErrorMessages();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    removeErrorMessages();
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    removeErrorMessages();
    setName(event.target.value);
  };

  const CloseIcon = () => {
    return (
      <MdClose
        onClick={() => {
          toggleModal();
        }}
        className="absolute top-1 right-1 md:top-4 md:right-4 text-2xl hover:cursor-pointer"
      ></MdClose>
    );
  };

  return (
    <div
      className={`
      fixed 
      w-screen 
      h-screen 
      top-0 left-0 
      flex flex-col 
      justify-center 
      items-center 
      modal-container
      transition-all
      ${visible ? "visible" : "invisible"}
      `}
    >
      <div
        className={`
        absolute
        w-full h-full
        bg-neutral-800
        transition-all
        ${visible ? "opacity-50" : "opacity-0"}
        `}
      />
      <div
        className={`
        m-2
        bg-neutral-100 
        space-y-4 z-10 
        rounded 
        shadow-slate-700 
        shadow-sm 
        flex flex-col 
        md:px-20 md:py-10 py-6 
        relative 
        px-4
        transition-all
        ${visible ? "opacity-100" : "opacity-0"}
        ${visible ? "translate-y-0" : "-translate-y-10"}
        `}
      >
        <CloseIcon />
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
          errorMessage={"Please enter a valid email"}
        ></InputField>
        <InputField
          label={"Password"}
          type={"password"}
          placeholder={"password"}
          value={password}
          valid={passwordErrors}
          errorMessage={"Password should be at least 6 characters"}
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
