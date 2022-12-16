import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../src/contexts/UserContext";
import { setCookie, parseCookies } from "nookies";
import { api_helper } from "../../src/helpers/api_helper";
import { Head } from "next/document";

export default function Login(props: any) {
  const emailRef: any = useRef("");
  const passwordRef: any = useRef("");
  const error_div: any = useRef(); //

  const { setUser }: any = useContext(UserContext);

  const [validationError, setValidationError]: any = useState([]);

  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    api_helper
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.success == false) {
          console.log(response);
          error_div.current.style.display = "flex";
          setValidationError((prevState: any) => response.data.message);
          return router.push("/login");
        }

        setUser({
          isLogged: true,
          user: response.data.user,
        });

        setCookie(null, "usuario_id", response.data.user.cliente_id, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          sameSite: "Strict",
        });

        setCookie(null, "token", response.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          sameSite: "Strict",
        });

        return router.push("/dashboard");
      });
  }
  return (
    <div>
      <div className="container relative flex flex-col items-center h-[100vh]">
        <div className="relative flex flex-col items-center top-[100px]">
          <h1 className="font-bold text-[2rem]">LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-[400px] h-[500px] flex flex-col justify-center">
            <label htmlFor="email">Email</label>
            <input
              className="rounded-md bg-slate-100 h-[40px] pl-4"
              type="email"
              placeholder="Ex: email@email.com"
              ref={emailRef}
            />
            <label htmlFor="password">Senha</label>
            <input
              className="rounded-md bg-slate-100 h-[40px] pl-4"
              type="password"
              placeholder="*******"
              ref={passwordRef}
            />
            <div>
              <a>Esqueci minha senha</a>
            </div>
            <button
              type="submit"
              className="bg-black font-bold text-white text-lg rounded-md mb-5 h-[35px]"
            >
              Login
            </button>
            <div
              className={`hidden border-2 duration-75 border-black bg-slate-100 rounded-md flex items-center w-[400px] text-center justify-center h-[120px]`}
              ref={error_div}
            >
              {validationError && (
                <p className="font-bold text-md"> {validationError}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { token } = parseCookies(context);

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
