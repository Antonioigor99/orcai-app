import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("As senhas não coincidem.");
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Salva o nome no perfil do Firebase
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Este email já está em uso.");
          break;
        case "auth/invalid-email":
          setError("Email inválido.");
          break;
        case "auth/weak-password":
          setError("A senha deve ter pelo menos 6 caracteres.");
          break;
        default:
          setError("Erro ao cadastrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Cadastro
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-gray-700 font-medium"
            >
              Nome
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-gray-700 font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-gray-700 font-medium"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-gray-700 font-medium"
            >
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          <p className="text-sm text-center mt-4">
            Já tem uma conta?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Entrar
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
