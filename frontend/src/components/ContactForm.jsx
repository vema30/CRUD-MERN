import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, fetchContacts } from '../features/ContactSlice';

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addContact(form));
    await dispatch(fetchContacts()); // refresh list
    setForm({ name: '', email: '', phone: '', type: 'personal' }); // clear form
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
      <h3 className="text-xl font-bold mb-2">Add New Contact</h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      >
        <option value="personal">Personal</option>
        <option value="professional">Professional</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Add Contact
      </button>
    </form>
  );
}

export default ContactForm;
