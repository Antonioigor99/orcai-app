import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";

function Profile() {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [companyName, setCompanyName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Upload da foto, se tiver
      let photoURL = user.photoURL;
      if (photo) {
        const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
        await uploadBytes(storageRef, photo);
        photoURL = await getDownloadURL(storageRef);
      }

      // Atualiza nome e foto no auth
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      // Atualiza senha
      if (newPassword.length >= 6) {
        await updatePassword(user, newPassword);
      }

      // Salva nome da empresa no Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        companyName,
        photoURL,
      });

      setMessage("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setMessage("Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Nome da Empresa</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Nova Senha (mínimo 6 caracteres)</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Foto de Perfil</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
        {message && <p className="text-blue-600">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
