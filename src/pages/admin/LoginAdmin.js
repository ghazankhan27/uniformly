import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "validator";
import { setAuth } from "../../redux/slices/AdminAuthSlice";
import InputField from "../../components/login - signup/components/InputField";
import Button from "../../components/Button";

export default function LoginAdmin() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErrors, setUsernameErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [message, setMessage] = useState(null);

  const removeErrorMessages = () => {
    if (usernameErrors !== false) setUsernameErrors(false);
    if (passwordErrors !== false) setPasswordErrors(false);
    if (message !== null) setMessage(null);
  };

  const handleUsernameChange = (event) => {
    removeErrorMessages();
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    removeErrorMessages();
    setPassword(event.target.value);
  };

  const usernameValidation = (username) => {
    const usernameCheck = !isEmpty(username);

    if (usernameCheck) {
      setUsernameErrors(false);
      return true;
    }

    setUsernameErrors(true);
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

  const login = (username, password) => {
    const validated =
      usernameValidation(username) && passwordValidation(password);

    if (validated) {
      const data = { username: username, password: password };

      fetch("http://localhost:8000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          if (res.status !== 200) {
            let data = await res.json();
            setMessage(data.message);
            return null;
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            dispatch(setAuth(true));
          } else {
            throw Error("Unauthorized");
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
    <div className="fade-in flex flex-col items-center space-y-4 mt-36">
      <div className="">
        <p className="text-2xl font-bold my-4 text-center border-b border-slate-900 pb-2">
          Admin Login
        </p>
        <InputField
          label={"Username"}
          type={"text"}
          placeholder={"username"}
          value={username}
          changeHandler={handleUsernameChange}
          valid={usernameErrors}
          errorMessage={"Field cannot be empty."}
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
            clickHandler={() => login(username, password)}
            label={"Login"}
          ></Button>
        </div>
        <p className="text-xl font-semibold text-red-600 border-t border-slate-900 pt-2 mt-4 text-center">
          {message}
        </p>
      </div>
    </div>
  );
}
