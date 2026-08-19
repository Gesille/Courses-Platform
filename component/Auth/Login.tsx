/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useLoginUserMutation } from "@/redux/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState<boolean>(false);
  const [login, { isSuccess, error, isLoading }] = useLoginUserMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
      setOpen(false);
      refetch?.();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className="font-serif text-2xl font-semibold text-foreground text-center">
        Welcome back
      </h1>
      <p className="text-sm text-muted-foreground text-center mt-1 mb-6">
        Sign in to continue with Next Learn
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="text-sm font-medium text-foreground mb-1.5 block"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <HiOutlineMail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="you@example.com"
              className={`w-full h-11 pl-10 pr-3 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-ring/40 focus:border-primary ${
                errors.email && touched.email
                  ? "border-destructive"
                  : "border-border"
              }`}
            />
          </div>
          {errors.email && touched.email && (
            <span className="text-destructive text-xs mt-1 block">
              {errors.email}
            </span>
          )}
        </div>

        <div>
          <label
            className="text-sm font-medium text-foreground mb-1.5 block"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <HiOutlineLockClosed
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="••••••••"
              className={`w-full h-11 pl-10 pr-10 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-ring/40 focus:border-primary ${
                errors.password && touched.password
                  ? "border-destructive"
                  : "border-border"
              }`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-foreground transition"
                size={18}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-foreground transition"
                size={18}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && touched.password && (
            <span className="text-destructive text-xs mt-1 block">
              {errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-xl text-primary-foreground text-sm font-semibold bg-primary hover:brightness-110 active:scale-[0.98] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground font-medium">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="flex items-center justify-center size-11 rounded-xl border border-border hover:bg-muted transition active:scale-95"
          aria-label="Continue with Google"
        >
          <FcGoogle size={20} />
        </button>
        <button
          type="button"
          onClick={() => signIn("github")}
          className="flex items-center justify-center size-11 rounded-xl border border-border hover:bg-muted transition active:scale-95"
          aria-label="Continue with GitHub"
        >
          <AiFillGithub size={20} className="text-foreground" />
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account?{" "}
        <span
          className="text-primary font-semibold cursor-pointer hover:underline"
          onClick={() => setRoute("Sign-Up")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;