import { useRef, useState } from "react";
import { api_helper } from "../../src/helpers/api_helper";
import Head from "next/head";

export default function Cadastro() {
  const [validationError, setValidationError]: any = useState();

  const nome_ref: any = useRef("");
  const sobrenome_ref: any = useRef();
  const email_ref: any = useRef();
  const password_ref: any = useRef();
  const password_confirmation_ref: any = useRef();

  const css = "";

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const body: any = {
      nome: nome_ref.current.value,
      sobrenome: sobrenome_ref.current.value,
      email: email_ref.current.value,
      password: password_ref.current.value,
      password_confirmation: password_confirmation_ref.current.value,
    };

    api_helper.post("/register", body).then((response) => {
      console.log(response);
      if (response.data.success == false) {
        setValidationError(response.data);
      }
    });
  };

  console.log(validationError);

  return (
    <div className="">
      <Head>
        <title>Cadstro</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container relative top-[100px] flex flex-col items-center">
        <div className="relative flex flex-col items-center top-[10px] mb-7">
          <h1 className="font-bold text-[2rem]">Cadastro</h1>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <div className="w-[400px] h-[500px] flex flex-col justify-center">
            <label htmlFor="nome">Nome</label>
            <input
              className="rounded-md bg-slate-100 h-[40px] pl-4"
              type="text"
              placeholder="Ex: João"
              id="nome"
              ref={nome_ref}
            />
            {validationError && (
              <p className={css}>{validationError.error.nome}</p>
            )}
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              className="rounded-md bg-slate-100 h-[40px] pl-4"
              type="text"
              placeholder="Ex: Souza silva"
              id="sobrenome"
              ref={sobrenome_ref}
            />
            {validationError && (
              <p className={css}>{validationError.error.sobrenome}</p>
            )}
            <label htmlFor="Email">Email</label>
            <input
              className="rounded-md bg-slate-100 h-[40px] pl-4"
              type="email"
              placeholder="Ex: email@email"
              id="email"
              ref={email_ref}
            />
            {validationError && (
              <p className={css}>{validationError.error.email}</p>
            )}
            <label htmlFor="Senha">Senha</label>
            <input
              className="rounded-md bg-slate-100 h-[40px] pl-4"
              type="text"
              placeholder="******"
              id="password"
              ref={password_ref}
            />
            {validationError && (
              <p className={css}>{validationError.error.sobrenome}</p>
            )}
            <label htmlFor="">Confirme sua senha</label>
            <input
              className="rounded-md bg-slate-100 h-[40px] pl-4 mb-7"
              type="text"
              placeholder="******"
              id="password_confirmation"
              ref={password_confirmation_ref}
            />
            <button
              type="submit"
              className="bg-black font-bold text-white text-lg rounded-md mb-5 h-[35px]"
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
