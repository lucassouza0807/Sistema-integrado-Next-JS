import { UserContext } from "../src/contexts/UserContext";
import { useContext } from "react";

export default function Home() {
  const { user } : any = useContext(UserContext);
  console.log(user);
  
  return (
    <>
      <h1 className="bg-slate-100 relative top-[300px]">LdUCAS</h1>
    </>
  );
}
