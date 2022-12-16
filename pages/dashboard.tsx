import { parseCookies } from "nookies";
import { useContext } from "react";
import { UserContext } from "../src/contexts/UserContext";
import { UserTheme } from "../src/contexts/UserTheme";
import { api_helper } from "../src/helpers/api_helper";
import Header from "./components/Header";

export default function Dashboard({ ...props }: any) {
  const { user }: any = useContext(UserContext);
  const { theme }: any = useContext(UserTheme);
  
  const link = "https://github.com/lucassouza0807.png";

  return (
    <>
      <div style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}>
        <div className="flex flex-row justify-center h-[100vh]">
          <div className="bg-white relative top-[100px] flex justify-center items-center rounded-md w-[700px] h-[200px]">
            <div className="flex flex-row justify-center items-center">
              <div className="overflow-hidden m-4 w-[130px] h-[130px] rounded-full">
                <img className="" src={link} alt="avatar" />
              </div>
              <span className="flex flex-col justify-center items-center">
                <h1 className="text-[2rem] font-bold">
                  Bem vindo, {user.user.nome}
                </h1>
                <h3 className="text-lg"></h3>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { token, user } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  
  return {
    props: {
      token: token,
    },
  };
}
