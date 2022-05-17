import React from "react";
import Button from "../components/login - signup/Button";
import InputField from "../components/login - signup/components/InputField";

export default function LoginSignup() {
  return (
    <div className="grid grid-cols-2 gap-10 mt-40">
      <div className="px-40 space-y-4">
        <p className="text-center text-2xl border-b border-slate-800 py-4 mb-8">
          Login
        </p>
        <InputField
          label={"Email"}
          type={"email"}
          placeholder={"email"}
        ></InputField>
        <InputField
          label={"Password"}
          type={"password"}
          placeholder={"password"}
        ></InputField>
        <div className="flex justify-center py-10">
          <Button label={"Login"}></Button>
        </div>
      </div>
      <div className="text-4xl leading-loose mt-10">
        <p>Login now to enjoy full benefits of our application!</p>
      </div>
    </div>
  );
}
