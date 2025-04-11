import { useEffect, useState } from 'react';

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://backend-tgfw-7cw4t.ondigitalocean.app/accounts', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => setAccounts(data));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('https://backend-tgfw-7cw4t.ondigitalocean.app/accounts', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ phone })
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Akun Telegram</h2>
      <ul className="mb-6">
        {accounts.map((acc, i) => (
          <li key={i} className="border-b py-1">{acc.phone}</li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input className="border px-4 py-2" placeholder="Nomor HP" onChange={e => setPhone(e.target.value)} />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Tambah</button>
      </form>
    </div>
  );
}