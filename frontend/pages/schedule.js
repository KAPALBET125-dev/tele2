import { useEffect, useState } from 'react';

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [phone, setPhone] = useState('');
  const [target, setTarget] = useState('');
  const [interval, setInterval] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://backend-tgfw-7cw4t.ondigitalocean.app/schedules', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => setSchedules(data));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('https://backend-tgfw-7cw4t.ondigitalocean.app/schedules', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ phone, target, interval })
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jadwal Forward</h2>
      <ul className="mb-6">
        {schedules.map((sch, i) => (
          <li key={i} className="border-b py-1">{sch.phone} → {sch.target} tiap {sch.interval} menit</li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="grid grid-cols-3 gap-2">
        <input className="border px-4 py-2" placeholder="Nomor HP" onChange={e => setPhone(e.target.value)} />
        <input className="border px-4 py-2" placeholder="Target" onChange={e => setTarget(e.target.value)} />
        <input className="border px-4 py-2" type="number" placeholder="Interval (mnt)" onChange={e => setInterval(e.target.value)} />
        <button className="col-span-3 bg-indigo-600 text-white px-4 py-2 rounded" type="submit">Tambah</button>
      </form>
    </div>
  );
}