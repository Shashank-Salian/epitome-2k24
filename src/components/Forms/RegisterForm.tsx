"use client";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import Input from "../CustomUI/Input";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { BookOpen, Loader2Icon, UserPlusIcon } from "lucide-react";

const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [collegeName, setCollegeName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams().get("callbackUrl");
  const callback = params ? (params as string) : "";

  const departmentList = ["MCA", "MSc", "BDA", "ST"]

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
      console.log("RegisterRes", res);

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
      className="relative flex_center flex-col gap-2 2xl:gap-4 font-oxanium w-fit px-8 py-4 rounded-lg bg-background/40 backdrop-blur-lg lg:ml-[4em]"
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

        <div className="relative min-w-[350px]">
          <label className='text-[0.9em] bg-background/0 px-1'>
            <span>Department</span>
            <span className="text-[1.2em] text-red-600"> ★</span>
          </label>

          <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
            <select
              name="department"
              onChange={(e) => setDepartment(e.target.value)} required={true}
              className="'text-[1em] w-full bg-background/0 px-2 py-1 border-none outline-none placeholder:text-secondary/80'">
              <option value="" className="text-background">Select Department</option>
              {departmentList.map((dept, index) => (
                <option key={index} value={dept} className="text-background">{dept}</option>
              ))}
            </select>

            <BookOpen size={24} className="absolute right-2 text-secondary" />
          </div>
        </div>

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
