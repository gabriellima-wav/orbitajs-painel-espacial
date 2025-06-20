import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);

      navigate("/login");
    } catch {
      alert("Erro ao sair. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 text-red-400 hover:text-red-600 disabled:opacity-60"
      disabled={loading}
    >
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
