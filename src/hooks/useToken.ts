import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const useToken = () => {
  const [token, setToken] = useState<null | undefined | string>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwt.decode(storedToken);
      if (
        decodedToken &&
        typeof decodedToken !== "string" &&
        decodedToken.exp! * 1000 > Date.now()
      ) {
        setIsAuthenticated(true);
      }
    }
    setToken(storedToken);
  }, []);

  return isAuthenticated;
};

export default useToken;
