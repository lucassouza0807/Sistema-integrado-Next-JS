import { UserContext } from "../src/contexts/UserContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="absolute h-[80px] bg-white w-[100vw]">
      <div>
        <div>
            
        </div>
      </div>
    </div>
  );
}
