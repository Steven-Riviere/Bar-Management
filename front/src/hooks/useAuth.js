import { useState, useEffect } from "react";
import apiFetch from "../api/apiClient.js";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const data = await apiFetch("/auth/me");
      setUser(data);
      return true;
    } 
    catch (err) {
      if (err.status === 401) {
        setUser(null);
        return false;
      }

      // pour les autres erreurs et a évoluer si besoin
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  return { user, setUser, loading, checkAuth };
}
