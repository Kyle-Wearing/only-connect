import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export function HomeScreen() {
  const { user } = useContext(UserContext);

  useEffect(() => {}, []);

  return <div></div>;
}
