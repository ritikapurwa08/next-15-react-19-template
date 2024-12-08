"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";
import { LockIcon, TriangleAlertIcon } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AuthSignUpSchema, AuthSignUpSchemaType } from "../types";
import CustomInput from "../../custom-form-helpers/custom-input";
import CustomPasswordInput from "../../custom-form-helpers/custom-password-input";
import ButtonLoader from "../../loader/button-loader";

interface AuthSignUpInputsProps {
  isSignUp: boolean;
  setIsSignUp: (isSignUp: boolean) => void;
}

export default function AuthSignUpInputs({
  isSignUp,
  setIsSignUp,
}: AuthSignUpInputsProps) {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);

  const router = useRouter();
  const { signIn } = useAuthActions();

  const form = useForm<AuthSignUpSchemaType>({
    resolver: zodResolver(AuthSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onPasswordSignUp = async (values: AuthSignUpSchemaType) => {
    if (!agreeToPrivacy) {
      toast.error("Please agree to the Privacy Policy and Terms of Service");
      return;
    }

    setPending(true);
    setErrorMessage("");

    try {
      await signIn("password", {
        email: values.email,
        password: values.password,
        flow: "signUp",
      });

      toast.success("Account created successfully");
      router.push("/");
    } catch (error) {
      const errorMsg = "Unable to create account. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      console.error("Sign up error:", error);
    } finally {
      setPending(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </CardTitle>
        <CardDescription>
          {isSignUp
            ? "Sign up to start your journey with us."
            : "Sign in to continue exploring our platform."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onPasswordSignUp)}
          >
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              disabled={pending}
            />

            <CustomPasswordInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              disabled={pending}
              icon={LockIcon}
              showPassword={showPassword}
            />

            <CustomPasswordInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              disabled={pending}
              icon={LockIcon}
              showPassword={showPassword}
            />

            {errorMessage && (
              <div className="flex items-center space-x-2 bg-red-100 p-2 rounded-md">
                <TriangleAlertIcon className="text-red-500 h-5 w-5" />
                <p className="text-red-700">{errorMessage}</p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-password"
                checked={showPassword}
                onCheckedChange={(checked) => setShowPassword(checked === true)}
              />
              <Label htmlFor="show-password">Show Password</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy-policy"
                checked={agreeToPrivacy}
                onCheckedChange={(checked) =>
                  setAgreeToPrivacy(checked === true)
                }
              />
              <Label htmlFor="privacy-policy">
                I agree to the Privacy Policy and Terms of Service
              </Label>
            </div>

            <Button
              size="default"
              className="w-full"
              type="submit"
              disabled={pending || !agreeToPrivacy}
            >
              {pending ? <ButtonLoader title="Signing up..." /> : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <Button
            onClick={toggleAuthMode}
            variant="link"
            className="text-blue-500 hover:underline text-sm"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
