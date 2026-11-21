"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  Checkbox,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

export default function LogInForm() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect")||'/'

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMessage("");
    setMessageType("");
  };

  // Validate fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Sign in with Better Auth
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: formData.email.trim(),
        password: formData.password,
        rememberMe,
      });

      if (error) {
        setMessage(
          error.message || "Invalid email or password. Please try again."
        );
        setMessageType("error");
        return;
      }

      // Redirect after successful login
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      console.error("Sign-in error:", error);

      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0f] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#15151c] p-6 shadow-2xl sm:p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold tracking-tight">
            <span className="text-sky-500">hire</span>
            <span className="text-orange-500">loop</span>
          </Link>

          <h1 className="mt-6 text-2xl font-semibold">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue your HireLoop journey.
          </p>
        </div>

        {/* Feedback Message */}
        {message && (
          <div
            role={messageType === "error" ? "alert" : "status"}
            className={`mb-5 rounded-lg border p-3 text-sm ${
              messageType === "error"
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-green-500/30 bg-green-500/10 text-green-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* Sign In Form */}
        <Form
          validationBehavior="aria"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Email */}
          <TextField
            name="email"
            isRequired
            isInvalid={Boolean(errors.email)}
            className="flex flex-col gap-2"
          >
            <Label className="text-sm font-medium text-gray-200">
              Email address
            </Label>

            <Input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              isDisabled={loading}
              className="w-full"
            />

            {errors.email && (
              <FieldError>{errors.email}</FieldError>
            )}
          </TextField>

          {/* Password */}
          <TextField
            name="password"
            isRequired
            isInvalid={Boolean(errors.password)}
            className="flex flex-col gap-2"
          >
            <Label className="text-sm font-medium text-gray-200">
              Password
            </Label>

            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                isDisabled={loading}
                className="w-full pr-16"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-400 hover:text-indigo-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <FieldError>{errors.password}</FieldError>
            )}
          </TextField>

          {/* Remember Me + Forgot Password */}
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <Checkbox
              isSelected={rememberMe}
              onChange={setRememberMe}
              isDisabled={loading}
            >
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>

              <Checkbox.Content>
                <span className="text-sm text-gray-400">
                  Remember me
                </span>
              </Checkbox.Content>
            </Checkbox>

            <Link
              href="/forgot-password"
              className="text-sm text-indigo-400 transition hover:text-indigo-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            href={`/signup?redirect=${redirectTo}`}
            className="font-medium text-indigo-400 transition hover:text-indigo-300"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}