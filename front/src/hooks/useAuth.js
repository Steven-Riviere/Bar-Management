import { useState, useEffect } from "react";
import apiFetch from "../api/apiClient.js";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const data = await apiFetch("/auth/me");
      if (!data) {
        setUser(null);
        return false;
      }

      setUser(data);
      return true;

    } catch (err) {
      console.error("Auth error:", err);
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  return { user, setUser, loading, checkAuth };
}
