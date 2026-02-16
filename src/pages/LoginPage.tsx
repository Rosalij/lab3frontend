import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {

const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");
const [error, setError] = useState("");
const { login, user } = useAuth();

const navigate = useNavigate();

useEffect(() => {
  if (user) {
    navigate("/admin");
  }
}, [user])
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  try {
    await login({ email, password });
    // If login succeeds, navigate to admin page
  } catch (error: any) {
    // Show backend error message if available
    setError(error.message || "Login failed");
    console.error("Login failed:", error);
  }
};


  return (
    <div className='bg-light p-5 rounded w-25 mx-auto mt-5'>
      <form onSubmit={handleSubmit} className='container flex-row gap-3 d-flex flex-column'>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-danger">{error}</div>}
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
