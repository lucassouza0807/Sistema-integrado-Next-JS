import Link from "next/link";
import { useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { UserContext } from "../../src/contexts/UserContext";
import { api_helper } from "../../src/helpers/api_helper";

export function GuestLayout() {
  return (
    <div className="absolute bg-white w-[100vw] bg-slate-100">
      <nav>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/cadastro">Cadatro</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export function AuthenticatedLayout() {
  const { user, setUser }: any = useContext(UserContext);

  const router = useRouter();

  const logout = () => {
    const { token, usuario_id } = parseCookies();

    api_helper.post(`/logout/${usuario_id}`).then(() => {
      destroyCookie(null, "token");
      destroyCookie(null, "usuario_id");
      setUser({
        isLogged: false,
        user: [],
      });

      return router.push("/");
    });
  };

  return (
    <div className="absolute bg-white w-[100vw] h-[5rem]">
      <div className="h-[5rem] flex flex-row">
        <nav className="flex items-center justify-center">
          <div className="absolute right-[30px]">
            <ul className="flex flex-row items-center">
              <li className="mr-5">Olá, {user.user.nome}</li>
              <li>
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
export default function Header(props: any) {
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });

  if (isLogged == true) {
    return <AuthenticatedLayout />;
  }

  if (isLogged == false) {
    return <GuestLayout />;
  }
}
