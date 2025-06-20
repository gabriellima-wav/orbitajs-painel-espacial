import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function NavItems() {
  const authContext = useContext(AuthContext);

  return (
    <nav className="w-64 bg-purple-950 text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Painel Espacial</h1>
      <ul className="space-y-2">
        <li><Link to="/dashboard" className="hover:text-purple-300">Dashboard</Link></li>
        <li><Link to="/image-of-day" className="hover:text-purple-300">Imagem do Dia</Link></li>
        <li><Link to="/favorites" className="hover:text-purple-300">Favoritos</Link></li>
      </ul>
      <button
        onClick={authContext ? authContext.logout : undefined}
        className="mt-6 text-red-400 hover:text-red-600"
        disabled={!authContext}
      >
        Sair
      </button>
    </nav>
  );
}
