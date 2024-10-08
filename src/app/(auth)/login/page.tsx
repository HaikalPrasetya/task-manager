"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import AuthInput from "@/components/AuthInput";

type InputState = {
  email: string;
  password: string;
  confirmPassword: string | undefined;
};

function LoginPage() {
  const [inputs, setInputs] = useState<InputState>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-11 max-w-[800px] mx-auto border-black px-28">
      {/* TOP */}
      <div className="flex flex-col gap-3 items-center">
        <h2 className="font-semibold text-2xl">Manage Task</h2>
        <h4 className="font-bold text-5xl">Selamat datang kembali</h4>
      </div>
      {/* INPUT SECTION */}
      <form action={() => console.log("Hello World")} className="w-full">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-3">
            <label className="font-semibold">Email</label>
            <AuthInput
              value={inputs.email}
              setValue={setInputs}
              name="email"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold">Password</label>
            <AuthInput
              value={inputs.password}
              setValue={setInputs}
              name="password"
              type="password"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button className="w-full text-center text-white font-bold text-lg">
            Login
          </Button>
        </div>

        <div className="mt-7">
          <h2 className="text-slate-500 text-md font-medium">
            Belum punya akun?{" "}
            <Link href="/register" className="text-mainAccent">
              Register
            </Link>
          </h2>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
