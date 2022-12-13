import { parseCookies } from "nookies";
import { useContext, createContext, useState, useEffect } from "react";
import { UserContext } from "../src/contexts/UserContext";
import { useUser } from "../src/hooks/useUser";

export default function Dashboard({ ...props }: any) {
  const { user, setUser }: any = useContext(UserContext);

  const link = "https://github.com/lucassouza0807.png";

  return (
    <>
    <div className="flex flex-row justify-center bg-slate-500 h-[100vh]">
      <div className="bg-white relative top-[100px] flex justify-center items-center rounded-md w-[700px] h-[200px]">
          <div className="flex flex-row justify-center items-center">
            <div className="overflow-hidden m-4 w-[130px] h-[130px] rounded-full">
              <img className="" src={link} alt="avatar" />
            </div>
            <span className="flex flex-col justify-center items-center">
              <h1 className="text-[2rem] font-bold">Bem vindo, {props.user.nome}</h1>
              <h3 className="text-lg">{props.user.email}</h3>
              
            </span>
          </div>
      </div>
    </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { token, usuario_id }: any = parseCookies(context);
  const api_secret = process.env.NEXT_PUBLIC_API_SECRET;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const response = await fetch(`http://localhost:8000/api/v1/user/${usuario_id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      api_secret: process.env.NEXT_PUBLIC_API_SECRET
    }
  });
  const data = await response.json();

  return {
    props: {
      user: data
    },
  };
}
