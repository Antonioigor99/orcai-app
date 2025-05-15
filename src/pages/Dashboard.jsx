import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex  flex-col">
      {/* Header */}
      <header className="bg-white flex  items-center flex-row-reverse justify-between px-4 py-3 shadow-md">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 md:hidden focus:outline-none"
          aria-label="Abrir menu"
        >
          {/* Ícone hambúrguer */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-blue-600">Orcai</h1>
        <button
          onClick={handleLogout}
          className="text-red-600 font-semibold hover:text-red-800 hidden md:block"
        >
          Sair
        </button>
      </header>

      {/* Sidebar móvel */}
      {menuOpen && (
        <nav className="bg-white shadow-md md:hidden">
          <ul className="flex flex-col">
            <li>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/budget"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200"
              >
                Orçamentos
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Conteúdo principal */}
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Bem-vindo ao Dashboard
        </h2>
        <p className="text-gray-700">
          Aqui você pode gerenciar seus orçamentos, ver relatórios e mais.
        </p>
      </main>

      {/* Botão de logout fixo no canto inferior direito para mobile */}
      <button
        onClick={handleLogout}
        className="md:hidden fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700"
        aria-label="Sair"
      >
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
