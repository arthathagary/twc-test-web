import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const useToken = () => {
  const [token, setToken] = useState<null | undefined | string>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [decodedToken, setDecodedToken] = useState<any | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwt.decode(storedToken);
      setDecodedToken(decodedToken);
      console.log(decodedToken, "decodedToken");
      if (decodedToken) {
        setIsAuthenticated(true);
      }
    }
    setToken(storedToken);
  }, []);

  return [isAuthenticated, token, decodedToken];
};

export default useToken;
