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
  RadioGroup,
  Radio,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect')|| '/'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "seeker",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name cannot exceed 50 characters.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Include at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Include at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Include at least one number.";
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password = "Include at least one special character.";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Role validation
    if (!["seeker", "recruiter"].includes(formData.role)) {
      newErrors.role = "Please select a valid account type.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Register user
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!validateForm()) {
      return;
    }

    const plan = formData.role === "seeker" ? "seeker_Free" : "recruiter_Free";
    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        plan:plan
      });

      if (error) {
        setMessage(
          error.message || "Registration failed. Please try again."
        );
        setMessageType("error");
        return;
      }

      console.log("Registration successful:", data);

      setMessage("Account created successfully!");
      setMessageType("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "seeker",

      });

      // Redirect after successful registration
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#15151c] p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold tracking-tight">
            <span className="text-sky-500">hire</span>
            <span className="text-orange-500">loop</span>
          </Link>

          <h1 className="mt-6 text-2xl font-semibold">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Join HireLoop and take your career to the next level.
          </p>
        </div>

        {/* Success and error messages */}
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

        {/* Registration form */}
        <Form
          validationBehavior="aria"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Full name */}
          <TextField
            name="name"
            isRequired
            isInvalid={Boolean(errors.name)}
            className="flex w-full flex-col gap-2"
          >
            <Label className="text-sm font-medium text-gray-200">
              Full name
            </Label>

            <Input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              isDisabled={loading}
              className="w-full"
            />

            {errors.name && <FieldError>{errors.name}</FieldError>}
          </TextField>

          {/* Email */}
          <TextField
            name="email"
            isRequired
            isInvalid={Boolean(errors.email)}
            className="flex w-full flex-col gap-2"
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

            {errors.email && <FieldError>{errors.email}</FieldError>}
          </TextField>

          {/* Account type */}
          <RadioGroup
            name="role"
            value={formData.role}
            onChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                role: value,
              }));

              setErrors((prev) => ({
                ...prev,
                role: "",
              }));

              setMessage("");
              setMessageType("");
            }}
            isDisabled={loading}
            isInvalid={Boolean(errors.role)}
            className="flex w-full flex-col gap-3"
          >
            <Label className="text-sm font-medium text-gray-200">
              Choose your account type
            </Label>

            {/* Job seeker */}
            <Radio
              value="seeker"
              className="w-full rounded-xl border border-white/10 p-4 transition hover:border-sky-500/60"
            >
              <Radio.Content className="flex items-center gap-3">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>

                <div className="flex flex-col gap-1">
                  <span className="font-medium text-white">
                    Job Seeker
                  </span>

                  <span className="text-xs text-gray-400">
                    Find jobs and grow your career.
                  </span>
                </div>
              </Radio.Content>
            </Radio>

            {/* Recruiter */}
            <Radio
              value="recruiter"
              className="w-full rounded-xl border border-white/10 p-4 transition hover:border-orange-500/60"
            >
              <Radio.Content className="flex items-center gap-3">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>

                <div className="flex flex-col gap-1">
                  <span className="font-medium text-white">
                    Recruiter
                  </span>

                  <span className="text-xs text-gray-400">
                    Find candidates and hire talent.
                  </span>
                </div>
              </Radio.Content>
            </Radio>

            {errors.role && <FieldError>{errors.role}</FieldError>}
          </RadioGroup>

          {/* Password */}
          <TextField
            name="password"
            isRequired
            isInvalid={Boolean(errors.password)}
            className="flex w-full flex-col gap-2"
          >
            <Label className="text-sm font-medium text-gray-200">
              Password
            </Label>

            <div className="relative w-full">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                isDisabled={loading}
                className="w-full pr-16"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-sky-400 hover:text-sky-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="text-xs leading-5 text-gray-500">
              Use 8+ characters with uppercase, lowercase, a number,
              and a symbol.
            </p>

            {errors.password && (
              <FieldError>{errors.password}</FieldError>
            )}
          </TextField>

          {/* Confirm password */}
          <TextField
            name="confirmPassword"
            isRequired
            isInvalid={Boolean(errors.confirmPassword)}
            className="flex w-full flex-col gap-2"
          >
            <Label className="text-sm font-medium text-gray-200">
              Confirm password
            </Label>

            <div className="relative w-full">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password again"
                value={formData.confirmPassword}
                onChange={handleChange}
                isDisabled={loading}
                className="w-full pr-16"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-sky-400 hover:text-sky-300"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.confirmPassword && (
              <FieldError>{errors.confirmPassword}</FieldError>
            )}
          </TextField>

          {/* Terms */}
          <p className="text-xs leading-5 text-gray-500">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-sky-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-sky-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Submit button */}
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </Form>

        {/* Sign in link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${redirectTo}`}
            className="font-medium text-sky-400 hover:text-sky-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}