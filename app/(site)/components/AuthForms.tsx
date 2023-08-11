"use client";
import axios from "axios";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import { useState, useCallback, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  type Variant = "LOGIN" | "REGISTER";
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    console.log(session);
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router, session]);

  const toogleVarian = useCallback(() => {
    variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then((data) => toast.success(data.data.message, { duration: 5000 }))
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setisLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          toast.success("Succes Logged in!");
          // router.push("/users");
        })
        .finally(() => setisLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setisLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Succes Logged in!");
        }
      })
      .finally(() => setisLoading(false));
  };

  return (
    <div
      className="
   mt-8
   sm:mx-auto
   sm:w-full
   sm:max-w-md"
    >
      <div
        className="
      bg-white
      px-4
      py-8
      shadow
      sm:rounded-lg
      sm:px-10
      "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="E-mail"
            register={register}
            errors={errors}
            type="email"
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            register={register}
            errors={errors}
            type="password"
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
            absolute
            inset-0
            flex
            items-center
            "
            >
              <div
                className="
               w-full 
               border-t
                border-gray-300"
              />
            </div>
            <div
              className="
            relative 
            flex 
            justify-center 
            text-sm"
            >
              <span
                className="
               bg-white 
               px-2 
               text-gray-500"
              >
                or continue with
              </span>
            </div>
          </div>

          <div
            className="
            mt-6
            flex
            gap-2
            "
          >
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div
          className="
        flex
        gap-2
        justify-center
        items-center
        text-sm
        mt-6
        px-2
        text-gray-500   
        "
        >
          <div>
            {variant === "LOGIN"
              ? "Don't have account?"
              : "Already have an account?"}
          </div>
          <div
            onClick={toogleVarian}
            className="underline cursor-pointer text-xs text-sky-500"
          >
            {variant === "LOGIN"
              ? "Click for create an account"
              : "Click for sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
