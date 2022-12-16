import { UserContext } from "../src/contexts/UserContext";
import { useContext, useEffect } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home({...props}) {

  //const data = useFetch("http://localhost:8000/api/v1/user/3");

  //console.log(data);

  return <>Lucas</>
  
}
