"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthActions } from "@convex-dev/auth/react";
import { Form } from "@/components/ui/form";
import { LockIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Hint } from "@/components/ui/hint";
import { Checkbox } from "@radix-ui/react-checkbox";
import { AuthSignInSchema, AuthSignInSchemaType } from "../types";
import CustomInput from "../../custom-form-helpers/custom-input";
import CustomPasswordInput from "../../custom-form-helpers/custom-password-input";
import ButtonLoader from "../../loader/button-loader";

export default function AuthSignInInputs() {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { signIn } = useAuthActions();

  const form = useForm<AuthSignInSchemaType>({
    resolver: zodResolver(AuthSignInSchema),
  });

  const onPasswordSignIn = async (values: AuthSignInSchemaType) => {
    setPending(true);
    setErrorMessage(""); // Clear any previous errors

    try {
      await signIn("password", {
        email: values.email,
        password: values.password,
        flow: "signIn",
      });

      toast.success("sign in succcessfully");

      router.push("/");
    } catch (error) {
      setErrorMessage("user email or password is incorrect");

      toast.error("user email or password is incorrect");

      console.error("Sign in error:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className=" flex flex-col gap-y-3"
        onSubmit={form.handleSubmit(onPasswordSignIn)}
      >
        <CustomInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your Email"
          disabled={pending}
          icon={MailIcon}
        />

        <CustomPasswordInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your Password"
          disabled={pending}
          icon={LockIcon}
          showPassword={showPassword}
        />

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-row gap-x-2 items-center justify-start ">
          <Hint
            side="bottom"
            label={`${showPassword ? "hide password" : "show password"}`}
          >
            <Checkbox
              id="show-password"
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(checked === true)}
            />
          </Hint>
          <p className="text-gray-500 text-sm">
            {showPassword ? "hide password" : "show password"}
          </p>
        </div>

        <Button
          size="default"
          className="w-full"
          type="submit"
          disabled={pending}
        >
          {pending ? <ButtonLoader title="Signing in..." /> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
