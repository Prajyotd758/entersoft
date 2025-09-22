"use client";
import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoginPage() {
  const [login, setLogin] = useState<boolean | null>(null);

  type userdata = {
    email: string;
    password: string;
  };

  const [LoginData, SetLoginData] = useState<userdata>({
    email: "",
    password: "",
  });

  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const LoginUser = async () => {
    if (LoginData.email === "" || LoginData.password === "") {
      alert("Fields can not be empty.");
    } else {
      try {
        const { email, password } = LoginData;
        const result = await signIn("credentials", {
          email,
          password,
          userType,
          redirect: false,
        });

        console.log(result);

        if (result?.error) {
          alert(`Invalid crdentials!`);
        }
      } catch (error) {
        alert(`Error has occured, please try later!`);
      }
    }
  };

  const [userType, setUsertype] = useState<string>("Reporter");

  useGSAP(() => {
    if (login) {
      gsap.to(".form-div", {
        yPercent: "-60",
        duration: 2,
      });
    } else {
      gsap.to(".form-div", {
        yPercent: "0",
        duration: 2,
      });
    }
  }, [login]);

  return (
    <div className="relative w-full max-h-screen flex justify-evenly items-center overflow-hidden">
      <div className="max-md:hidden w-xl flex flex-col gap-3.5 p-4">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          BUG REPORTING SYSTEM.
        </h1>
        <h1 className="text-xl">This is built for temporary purpose.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem iusto repudiandae porro magni odit in aliquam provident
          necessitatibus rem ad voluptas veniam, nihil iste eveniet, ipsam vero
          optio magnam autem!
        </p>
      </div>
      <div className="relative form-div top-[50vh] flex flex-col max-lg:mr-4 justify-between items-center h-[160vh]">
        <div className="relative login-form max-md:w-xs w-md bg-white rounded-xl p-5 shadow-2xl">
          <form className="w-full flex flex-col items-center gap-6 p-10">
            <input
              type="text"
              className="text-center w-full rounded-xs p-2 border-1 border-gray-400"
              onChange={handleState}
              value={LoginData.email}
              name="email"
              placeholder="email"
              required
            />
            <input
              type="text"
              className="text-center w-full rounded-xs p-2 border-1 border-gray-400"
              onChange={handleState}
              value={LoginData.password}
              name="password"
              placeholder="Password"
              required
            />
            <Select onValueChange={(e) => setUsertype(e)}>
              <SelectTrigger className="w-full border border-gray-400 outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="Reporter">Reporter</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <button
              className="w-full rounded-xs p-2 bg-blue-400 text-white hover:shadow-lg hover:translate-y-[-5px] hover:scale-105 duration-300"
              onClick={(e) => {
                e.preventDefault();
                LoginUser();
              }}
            >{`Sign in as ${userType}`}</button>
          </form>
          <hr />
          <div className="w-full flex flex-col items-center gap-6 p-10">
            <button
              className="w-full rounded-md p-3 bg-gray-100 text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-600 hover:shadow-md transition-all duration-300"
              onClick={() => {
                setLogin(true);
              }}
            >
              New here? Sign up!
            </button>
          </div>
        </div>
        <RegistrationForm setLogin={setLogin} />
      </div>
    </div>
  );
}

function RegistrationForm({
  setLogin,
}: {
  setLogin: Dispatch<SetStateAction<boolean | null>>;
}) {
  type userdata = {
    email: string;
    password: string;
    ConfirmPassword: string;
  };

  const [LoginData, SetLoginData] = useState<userdata>({
    email: "",
    password: "",
    ConfirmPassword: "",
  });

  const registerUser = async () => {
    const { email, password, ConfirmPassword } = LoginData!;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "" || ConfirmPassword === "") {
      alert("Fields can not be empty.");
      return;
    }

    if (!emailRegex.test(email as string)) {
      alert("Not a valid email.");
      return;
    }

    if (password.length < 8) {
      alert("Password too short.");
      return;
    } else {
      if (LoginData!.password !== LoginData!.ConfirmPassword) {
        alert("password dont match");
        return;
      }
      try {
        const response = await axios.post(`/api/register`, {
          ...LoginData,
          userType,
        });
        const data = await response.data;
        alert(`${data.message}`);
      } catch (error) {
        alert("some error has occured.");
      } finally {
        SetLoginData({
          email: "",
          password: "",
          ConfirmPassword: "",
        });
      }
    }
  };

  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [userType, setUsertype] = useState<string>("Reporter");
  return (
    <div className="registration-form max-md:w-xs w-md bg-white rounded-xl p-5 shadow-2xl">
      <form className="w-full flex flex-col items-center gap-6 p-10">
        <input
          type="text"
          className="text-center w-full rounded-xs p-2 border-1 border-gray-400"
          onChange={handleState}
          value={LoginData.email}
          name="email"
          placeholder="email"
          required
        />
        <input
          type="password"
          className="text-center w-full rounded-xs p-2 border-1 border-gray-400"
          onChange={handleState}
          value={LoginData.password}
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          className="text-center w-full rounded-xs p-2 border-1 border-gray-400"
          onChange={handleState}
          value={LoginData.ConfirmPassword}
          name="ConfirmPassword"
          placeholder="Confirm Password"
          required
        />
        <Select onValueChange={(e) => setUsertype(e)}>
          <SelectTrigger className="w-full border border-gray-400 outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0">
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectItem value="Reporter">Reporter</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <button
          className="w-full rounded-xs p-2 bg-blue-400 text-white hover:shadow-lg hover:translate-y-[-5px] hover:scale-105 duration-300"
          onClick={(e) => {
            e.preventDefault();
            registerUser();
          }}
        >{`Sign in as ${userType}`}</button>
      </form>
      <hr />
      <div className="w-full flex flex-col items-center gap-6 p-10">
        <button
          className="w-full rounded-md p-3 bg-gray-100 text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-600 hover:shadow-md transition-all duration-300"
          onClick={() => {
            setLogin(false);
          }}
        >
          Already have a account? Sign in!
        </button>
      </div>
    </div>
  );
}
