import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  if (token) navigate('/dashboard');

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" className="border p-2 w-full mb-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="border p-2 w-full mb-2" onChange={handleChange} />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-4 text-sm">
        Don’t have an account? <Link to="/register" className="text-blue-600">Register</Link>
      </p>
    </div>
  );
}

export default Login;
