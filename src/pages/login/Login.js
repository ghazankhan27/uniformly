import React, { useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { isEmail, isEmpty } from "validator";
import SignUpModal from "./components/SignUpModal";
import { setAuth, setName } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import Loader from "../../components/Loader";

export default function LoginSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeErrorMessages = () => {
    if (emailErrors !== false) setEmailErrors(false);
    if (passwordErrors !== false) setPasswordErrors(false);
    if (message !== null) setMessage(null);
  };

  const handleEmailChange = (event) => {
    removeErrorMessages();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    removeErrorMessages();
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
    setShowModal((state) => !state);
  };

  const login = async (email, password) => {
    const validated = emailValidation(email) && passwordValidation(password);

    if (!validated) return;

    setLoading(true);

    try {
      const _data = { email: email, password: password };

      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_data),
      });

      const data = await response.json();

      if (response.status !== 200) {
        setMessage(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      dispatch(setAuth(true));

      dispatch(setName(data.name));

      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SignUpModal toggleModal={toggleModal} visible={showModal}></SignUpModal>
      <div className="fade-in grid lg:grid-cols-2 gap-10">
        <div className="md:px-20 space-y-4">
          <p className="text-center text-2xl border-b border-slate-800 py-4 mb-8">
            Login
          </p>
          <InputField
            label={"Email"}
            type={"email"}
            placeholder={"someone@example.com"}
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
            {loading ? (
              <Loader></Loader>
            ) : (
              <Button
                clickHandler={() => login(email, password)}
                label={"Login"}
              ></Button>
            )}
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
          <div className="text-xl font-semibold text-center border-t border-slate-900 pt-2">
            {message}
          </div>
        </div>
        <div className="text-4xl leading-loose mt-10 hidden lg:block">
          <p>Login now to enjoy full benefits of our application!</p>
        </div>
      </div>
    </div>
  );
}
