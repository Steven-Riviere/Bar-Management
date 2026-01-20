import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthWatcher({ checkAuth }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verify = async () => {
      const ok = await checkAuth();

      if (!ok && location.pathname !== "/signup") {
        navigate("/login", { replace: true });
      }
    };

    verify();

    const interval = setInterval(verify, 15_000); // 15s

    return () => clearInterval(interval);
  }, [location.pathname]);

  return null;
}
