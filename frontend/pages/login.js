import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-tgfw-7cw4t.ondigitalocean.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, password }),
      });
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        alert('Login sukses!');
      } else {
        alert('Login gagal: ' + JSON.stringify(data));
      }
    } catch (err) {
      alert('Gagal login: ' + err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login Admin</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="w-full border px-4 py-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input className="w-full border px-4 py-2" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
}