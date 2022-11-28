import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext, UserContextType } from "./contexts/UserProvider";

export default function Login(props: any) {
  const emailRef: any = useRef("");
  const passwordRef: any = useRef("");

  const [validationError, setValidationError]: any = useState();
  const [errorContainer, setErrorContainer]: any = useState("hidden");

  const { user, setUser } = useContext<UserContextType>(UserContext);

  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await fetch("http://127.0.0.1:8000/api/v1/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        api_secret: props.env_api_secret,
      },
    });

    const response_body = await response.json();
    console.log(response_body);
    response_body.success === true
      ? window.localStorage.setItem(
          "user",
          JSON.stringify({
            usuario_id: response_body.cliente_id,
            user_name: response_body.cliente_nome,
            session_token: response_body.token
          })
        )
      : setValidationError((prevState: any) => response_body);

    if (response_body.success == true) {
      setUser({ isLogged: true}) 
      router.push("/dashboard");
    }
  }

  console.log(user);

  useEffect(() => {
    validationError ? setErrorContainer("block") : setErrorContainer("hidden");
  }, [validationError]);

  return (
    <div className="container relative flex flex-col items-center h-[100vh]">
      <div className="relative flex flex-col items-center top-[100px]">
        <div
          className={`${errorContainer} border-2 duration-75 border-black bg-slate-100 rounded-md flex items-center w-[400px] text-center justify-center h-[120px]`}
        >
          {validationError && (
            <p className="font-bold text-md"> {validationError.message}</p>
          )}
        </div>
        <h1 className="font-bold text-[2rem]">MEU & OVO</h1>
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
          <label htmlFor="password">Password</label>
          <input
            className="rounded-md bg-slate-100 h-[40px] pl-4"
            type="password"
            ref={passwordRef}
          />
          <div>
            <a>Esqueci minha senha</a>
          </div>
          <button
            type="submit"
            className="bg-black font-bold text-white text-lg rounded-md h-[35px]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export async function getStaticProps(context: any) {
  return {
    props: {
      env_api_secret: process.env.API_SECRET,
    },
  };
}
