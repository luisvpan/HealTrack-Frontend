import useLogout from "hooks/use-logout";
import { useEffect } from "react";

const Logout = () => {
  const logout = useLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return <div></div>;
};

export default Logout;
