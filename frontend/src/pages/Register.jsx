import { useState } from 'react';
import api from '../services/api';
import Login from './Login';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [l,setL]=useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', form);
      localStorage.setItem('token', res.data.token);
      setMessage('Registration successful!');
      setL(true);
    
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Name" onChange={onChange} className="border p-2 w-full mb-2" />
        <input name="email" placeholder="Email" onChange={onChange} className="border p-2 w-full mb-2" />
        <input name="password" placeholder="Password" type="password" onChange={onChange} className="border p-2 w-full mb-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      {l && <Login></Login>}
    </div>
  );
}

export default Register;

