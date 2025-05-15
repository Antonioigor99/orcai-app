import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function BudgetForm() {
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!clientName || !description || !amount) {
      return setError("Por favor, preencha todos os campos.");
    }

    if (isNaN(amount)) {
      return setError("Valor deve ser um número válido.");
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "budgets"), {
        clientName,
        description,
        amount: parseFloat(amount),
        createdAt: serverTimestamp(),
      });
      setSuccess("Orçamento salvo com sucesso!");
      setClientName("");
      setDescription("");
      setAmount("");
    } catch (err) {
      setError("Erro ao salvar orçamento: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Voltar para o Dashboard
      </button>

      <h2 className="text-xl font-bold mb-4">Adicionar Orçamento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nome do Cliente</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            disabled={loading}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar Orçamento"}
        </button>
      </form>
    </div>
  );
}

export default BudgetForm;
