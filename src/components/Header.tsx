import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg hover:text-blue-400 transition-colors">
          🃏 Poker Range Visualizer
        </Link>
        <nav className="flex gap-4">
          <Link href="/" className="text-gray-300 hover:text-white text-sm transition-colors">
            Range Builder
          </Link>
          <Link href="/compare" className="text-gray-300 hover:text-white text-sm transition-colors">
            Compare Ranges
          </Link>
        </nav>
      </div>
    </header>
  );
}
