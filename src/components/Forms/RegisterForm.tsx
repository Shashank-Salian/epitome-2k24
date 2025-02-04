"use client";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import Input from "../CustomUI/Input";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Loader2Icon, UserPlusIcon } from "lucide-react";

const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [collegeName, setCollegeName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [accomodationRequired, setAccomodationRequired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams().get("callbackUrl");
  const callback = params ? (params as string) : "";


  const HandleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Exit function if passwords do not match
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const SignupToastID = toast.loading("Creating user...");
    setIsLoading(true);

    try {
      const res = await fetch("/api/post/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          collegeName,
          department,
          phone,
          email,
          password,
          accomodationRequired
        }),
      });

      if (res?.status === 201) {
        const data = await res.json();

        toast.success(data?.message, {
          id: SignupToastID,
        });

        router.push("./login");
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        id: SignupToastID,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const HandleOAuthLogin = async () => {
    const OAuthTostID = toast.loading(`Connecting to Google...`);
    setIsLoading(true);

    try {
      const res = await signIn("google", {
        callbackUrl: callback || "/dashboard",
      });
      // console.log("RegisterRes", res);

      toast.success("Logged in Successfully!", {
        id: OAuthTostID,
      });
    } catch (err) {
      toast.error("Something went wrong!", {
        id: OAuthTostID,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  return (
    <div
      data-augmented-ui="tl-2-clip-y tr-clip br-2-clip-y bl-clip"
      className="relative flex_center flex-col gap-2 2xl:gap-4 font-oxanium w-fit p-4 py-10 sm:p-6 rounded-lg bg-background/40 backdrop-blur-lg"
    >
      <h1 className="hidden lg:block text-[1.5em] 2xl:text-[2em] font-medium">
        Create new account
      </h1>

      <form onSubmit={HandleRegister} className="flex flex-col gap-3 2xl:gap-4">
        <Input
          type="text"
          label="Username"
          name="username"
          placeholder="Enter your name"
          className="2xl:w-[500px]"
          setValue={setUsername}
          required={true}
        />
        <Input
          type="text"
          label="College Name"
          name="collegeName"
          placeholder="Enter your College name"
          className="2xl:w-[500px]"
          setValue={setCollegeName}
          required={true}
        />

        <Input
          type="text"
          label="Department"
          name="department"
          placeholder="Enter Department"
          className="2xl:w-[500px]"
          setValue={setDepartment}
          required={true}
        />

        <Input
          type="tel"
          label="Phone Number"
          placeholder="Enter your Phone number"
          className="2xl:w-[500px]"
          setValue={setPhone}
          required={true}
        />
        <Input
          type="email"
          label="Email"
          placeholder="example@gmail.com"
          className="2xl:w-[500px]"
          setValue={setEmail}
          required={true}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter password"
          className="2xl:w-[500px]"
          setValue={setPassword}
          required={true}
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Retype password"
          className="2xl:w-[500px]"
          setValue={setConfirmPassword}
          required={true}
        />

        <div className="relative w-[325px] md:min-w-[350px] 2xl:w-[500px] py-2">
          <label className='text-[0.9em] bg-background/0 px-1'>Accomodation</label>

          <div className="flex_center gap-2 w-full">
            <input type="checkbox" name="accommodation" className="mr-2" onChange={(e) => setAccomodationRequired(e.target.checked)} />
            <p className="text-sm text-wrap">
              Please check this box if your team requires accommodation. We will reach out to you with further details regarding the arrangements.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="clip_Btn flex_center gap-4 text-white hover:bg-primary font-bold"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <UserPlusIcon />
          )}
          CREATE ACCOUNT
        </Button>
      </form>

      <div className="flex_center gap-2 text-[0.9em] sm:text-[0.8em] 2xl:text-[1em]">
        Already have an account?
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </div>

      <div className="w-full sm:px-2 flex_center gap-2 font-medium">
        <span className="flex w-full h-[2px] bg-slate-300"></span>
        <span>OR</span>
        <span className="flex w-full h-[2px] bg-slate-300"></span>
      </div>

      <div className="flex_center gap-4 w-full sm:px-4">
        {/* Google Login Button */}
        <button
          className="clip_Btn bg-foreground/10 sm:bg-background text-textClr w-full flex_center gap-4 p-2 rounded disabled:cursor-not-allowed"
          onClick={() => HandleOAuthLogin()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="-3 0 262 262"
            className="w-[30px] h-[30px]"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          <span className="text-[1.2em]">Google</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
