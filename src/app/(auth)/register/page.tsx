"use client";

import Button from "@/components/Button";
import PasswordRequirements from "@/components/register/PasswordRequirements";
import Link from "next/link";
import { useState } from "react";
import AuthInput from "@/components/AuthInput";
import { registerUser } from "@/lib/actions";
import { useToastContext } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string | undefined;
};

function RegisterPage() {
  const { push } = useRouter();
  const { setToast } = useToastContext();
  const [inputs, setInputs] = useState<Inputs>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isDisabled =
    !inputs.email || !inputs.password || !inputs.confirmPassword;

  const register = async () => {
    if (isDisabled) {
      setToast("Please fill all fieds!");
      return;
    }
    const { success, message, data } = await registerUser(inputs);

    if (success) {
      localStorage.setItem("auth_id", JSON.stringify(data));
    }

    setToast(message);

    push("/tasks");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-11 max-w-[800px] mx-auto border-black px-28">
      {/* TOP */}
      <div className="flex flex-col gap-3 items-center">
        <h2 className="font-semibold text-2xl">Manage Task</h2>
        <h4 className="font-bold text-5xl">Buat Akun</h4>
      </div>
      {/* INPUT SECTION */}
      <form className="w-full" action={register}>
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
          <PasswordRequirements value={inputs.password} setValue={setInputs} />
          <div className="flex flex-col gap-3">
            <label className="font-semibold">Ulang Password</label>
            <AuthInput
              value={inputs.confirmPassword as string}
              setValue={setInputs}
              name="confirmPassword"
              type="password"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button
            className={`w-full text-center text-white font-bold text-lg ${
              isDisabled && "cursor-not-allowed"
            }`}
          >
            Buat Akun
          </Button>
        </div>

        <div className="mt-7">
          <h2 className="text-slate-500 text-md font-medium">
            Udah punya akun?{" "}
            <Link href="/login" className="text-mainAccent">
              Login
            </Link>
          </h2>
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;
