import { useEffect, useState } from 'react';

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://backend-tgfw-7cw4t.ondigitalocean.app/admins', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => setAdmins(data));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('https://backend-tgfw-7cw4t.ondigitalocean.app/admins', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ username, password, role })
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manajemen Admin</h2>
      <ul className="mb-6">
        {admins.map((admin, i) => (
          <li key={i} className="border-b py-1 flex justify-between">
            <span>{admin.username}</span>
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{admin.role}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="grid grid-cols-3 gap-2">
        <input className="border px-4 py-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input className="border px-4 py-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <input className="border px-4 py-2" placeholder="Role" onChange={e => setRole(e.target.value)} />
        <button className="col-span-3 bg-purple-600 text-white px-4 py-2 rounded" type="submit">Tambah</button>
      </form>
    </div>
  );
}