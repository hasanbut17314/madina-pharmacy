import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLoginMutation, useRegisterMutation } from "@/api/authApi";
import { login as setLogin } from "@/store/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    emailSent: null,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Error state
  const [formError, setFormError] = useState("");

  // RTK Query hooks
  const [loginUser, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerUser, { isLoading: isRegisterLoading }] =
    useRegisterMutation();

  // Handle login form changes
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id.replace("login-", "")]: e.target.value,
    });
  };

  // Handle signup form changes
  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    const keyMap = {
      "signup-firstName": "firstName",
      "signup-lastName": "lastName",
      "signup-email": "email",
      "signup-password": "password",
      "confirm-password": "confirmPassword",
    };

    const key = keyMap[id];
    if (key) {
      setSignupData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      const result = await loginUser(loginData).unwrap();
      localStorage.setItem("user", JSON.stringify(result?.data.user));
      dispatch(setLogin({ userData: result.user }));

      if (result?.data?.user?.role === "admin") {
        navigate("/admin");
      } else if (result?.data?.user?.role === "rider") {
        navigate("/rider");
      } else if (result?.data?.user?.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/");
      }
    } catch (error) {
      setFormError(error?.data?.message || "Login failed. Please try again.");
    }
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setFormError("");

    if (signupData.password !== signupData.confirmPassword) {
      setFormError("Passwords do not match!");
      return;
    }

    try {
      const result = await registerUser(signupData).unwrap();
      console.log(result.message);

      setSignupData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        emailSent: result?.data?.email || signupData.email,
      });

      // dispatch(setLogin({ userData: result.user }));
    } catch (error) {
      setFormError(
        error?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center py-8 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Access your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              {signupData.emailSent ? (
                <div className="text-sm text-center text-green-600">
                  <h6>
                    We sent a verification email to{" "}
                    <span className="font-medium">{signupData.emailSent}</span>.
                    Please check your inbox to verify your account.
                  </h6>
                </div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstName">First Name</Label>
                      <Input
                        id="signup-firstName"
                        type="text"
                        placeholder="First name"
                        value={signupData.firstName}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastName">Last Name</Label>
                      <Input
                        id="signup-lastName"
                        type="text"
                        placeholder="Last name"
                        value={signupData.lastName}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isRegisterLoading}
                  >
                    {isRegisterLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
