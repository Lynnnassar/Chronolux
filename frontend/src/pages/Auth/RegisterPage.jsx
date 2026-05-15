import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      await register({ fullName, email, password });
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-3xl font-serif">Create your account</h1>
      <p className="text-sm text-black/60 mt-2">
        Start your ChronoLux collection.
      </p>
      <form onSubmit={handleSubmit} className="mt-10 space-y-4">
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="w-full border border-black/10 rounded-xl px-4 py-3"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border border-black/10 rounded-xl px-4 py-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full border border-black/10 rounded-xl px-4 py-3"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-3 rounded-full bg-black text-white text-xs uppercase tracking-[0.4em] disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
      <p className="text-sm text-black/60 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-black underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
