/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";

import { toast } from "react-hot-toast";
import { useRegisterUserMutation } from "@/redux/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid Email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState<boolean>(false);
  const [register, { data, error, isSuccess, isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successfully";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await register(values).unwrap();
      } catch (err: any) {
        toast.error(err?.data?.message || "Registration failed");
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className="font-serif text-2xl font-semibold text-foreground text-center">
        Create your account
      </h1>
      <p className="text-sm text-muted-foreground text-center mt-1 mb-6">
        Join Next Learn and get started
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="text-sm font-medium text-foreground mb-1.5 block"
            htmlFor="name"
          >
            Name
          </label>
          <div className="relative">
            <HiOutlineUser
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Giselle Georges"
              className={`w-full h-11 pl-10 pr-3 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-ring/40 focus:border-primary ${
                errors.name && touched.name
                  ? "border-destructive"
                  : "border-border"
              }`}
            />
          </div>
          {errors.name && touched.name && (
            <span className="text-destructive text-xs mt-1 block">
              {errors.name}
            </span>
          )}
        </div>

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
          {isLoading ? "Signing up..." : "Sign up"}
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
          className="flex items-center justify-center size-11 rounded-xl border border-border hover:bg-muted transition active:scale-95"
          aria-label="Continue with Google"
        >
          <FcGoogle size={20} />
        </button>
        <button
          type="button"
          className="flex items-center justify-center size-11 rounded-xl border border-border hover:bg-muted transition active:scale-95"
          aria-label="Continue with GitHub"
        >
          <AiFillGithub size={20} className="text-foreground" />
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <span
          className="text-primary font-semibold cursor-pointer hover:underline"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Signup;