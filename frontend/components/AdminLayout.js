
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 font-bold text-xl border-b">Userbot Panel</div>
        <nav className="p-4 flex flex-col gap-2">
          <Link href="/" className="text-gray-700 hover:text-indigo-600">🏠 Dashboard</Link>
          <Link href="/accounts" className="text-gray-700 hover:text-indigo-600">👤 Accounts</Link>
          <Link href="/schedule" className="text-gray-700 hover:text-indigo-600">🕒 Schedule</Link>
          <Link href="/admins" className="text-gray-700 hover:text-indigo-600">👥 Admins</Link>
          <Link href="/login" className="text-gray-700 hover:text-indigo-600">🔐 Login</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Telegram Dashboard</h1>
        </header>
        <div className="bg-white p-6 rounded shadow">{children}</div>
      </main>
    </div>
  );
}
