import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    setError("");
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password
      });

      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <AuthLayout title="Login">
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={submit}>Login</Button>

      {/* 🔹 Navigation */}
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
