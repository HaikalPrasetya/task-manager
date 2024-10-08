"use client";

import { FaRegCheckCircle } from "react-icons/fa";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AuthInput from "../AuthInput";

type Props = {
  value: string;
  setValue: Dispatch<
    SetStateAction<{
      email: string;
      password: string;
      confirmPassword: string | undefined;
    }>
  >;
};

function PasswordRequirements({ value, setValue }: Props) {
  const regexLowerCase = /[a-z]/;
  const regexUpperCase = /[A-Z]/;
  const regexNumber = /\d/;

  const [requirementsState, setRequirementsState] = useState({
    lowerCaseIsValid: false,
    uppercaseIsValid: false,
    numberIsValid: false,
    minimum8CharacterIsValid: false,
  });

  useEffect(() => {
    const checkLowerCase = regexLowerCase.test(value);
    const checkUpperCase = regexUpperCase.test(value);
    const checkNumber = regexNumber.test(value);
    const min8Character = value.length >= 8;

    setRequirementsState(() => ({
      lowerCaseIsValid: checkLowerCase,
      uppercaseIsValid: checkUpperCase,
      numberIsValid: checkNumber,
      minimum8CharacterIsValid: min8Character,
    }));
  }, [value]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <label className="font-semibold">Password</label>
        <AuthInput
          value={value}
          setValue={setValue}
          name="password"
          type="password"
        />
      </div>
      {/* PASSWORD REQUIREMENTS */}
      <div className="text-slate-500 mt-2">
        <span>Password harus berisi:</span>
        <div className="grid grid-cols-2 justify-between">
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <FaRegCheckCircle
                fill={`${
                  requirementsState.lowerCaseIsValid ? "green" : "brown"
                }`}
              />
              <span>Huruf kecil</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegCheckCircle
                fill={`${
                  requirementsState.uppercaseIsValid ? "green" : "brown"
                }`}
              />
              <span>Huruf besar</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <FaRegCheckCircle
                fill={`${requirementsState.numberIsValid ? "green" : "brown"}`}
              />
              <span>Angka</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegCheckCircle
                fill={`${
                  requirementsState.minimum8CharacterIsValid ? "green" : "brown"
                }`}
              />
              <span>Minimun 8 karakter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PasswordRequirements;
