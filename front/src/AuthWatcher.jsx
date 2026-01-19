import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthWatcher({ checkAuth }) {
  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    const verify = async () => {
      const ok = await checkAuth();
      if (!ok) navigate("/login", { replace: true });
    };

    verify();

    // check toutes les X secondes
    interval = setInterval(verify, 15_000); // 15s

    return () => clearInterval(interval);
  }, []);

  return null;
}
