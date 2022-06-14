import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import InputField from "../../components/login - signup/components/InputField";
import { isEmail, isEmpty } from "validator";
import SignUpModal from "../../components/login - signup/components/SignUpModal";
import { setAuth } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";

export default function LoginSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [showModal, setShowModal] = useState("invisible");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const emailValidation = (email) => {
    const emailCheck = isEmail(email);

    if (emailCheck) {
      setEmailErrors(false);
      return true;
    }

    setEmailErrors(true);
    return false;
  };

  const passwordValidation = (password) => {
    const passwordCheck = !isEmpty(password);

    if (passwordCheck) {
      setPasswordErrors(false);
      return true;
    }

    setPasswordErrors(true);
    return false;
  };

  const toggleModal = () => {
    if (showModal === "invisible") setShowModal("");
    else setShowModal("invisible");
  };

  const login = (email, password) => {
    const validated = emailValidation(email) && passwordValidation(password);

    if (validated) {
      const data = { email: email, password: password };

      fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status != 200) {
            let data = res.json();
            setMessage(data.message);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            dispatch(setAuth(true));
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      return;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <SignUpModal toggleModal={toggleModal} visible={showModal}></SignUpModal>
      <div className="md:px-20 space-y-4">
        <p className="text-center text-2xl border-b border-slate-800 py-4 mb-8">
          Login
        </p>
        <InputField
          label={"Email"}
          type={"email"}
          placeholder={"email"}
          value={email}
          changeHandler={handleEmailChange}
          valid={emailErrors}
          errorMessage={"Please enter a valid email."}
        ></InputField>
        <InputField
          label={"Password"}
          type={"password"}
          placeholder={"password"}
          value={password}
          changeHandler={handlePasswordChange}
          valid={passwordErrors}
          errorMessage={"Field cannot be empty."}
        ></InputField>
        <div className="flex flex-col items-center space-y-2 mt-6">
          <Button
            clickHandler={() => login(email, password)}
            label={"Login"}
          ></Button>
          <p>
            Don't have an account?{" "}
            <span
              onClick={toggleModal}
              className="text-blue-700 hover:underline hover:cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
      <div className="text-4xl leading-loose mt-10 hidden lg:block">
        <p>Login now to enjoy full benefits of our application!</p>
      </div>
    </div>
  );
}
