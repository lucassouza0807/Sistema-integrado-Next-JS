import { useRouter } from "next/router";
import { useState } from "react";

export default function Produto(props: any) {
  const [user, setUser] = useState();
  const data = props.users_data;

  return (
    <div>
      <h1>Pesquisar usuario</h1>
      <form>
        <label htmlFor="user_name">Username</label>
        <br />
        <input
          type="text"
          name="user_name"
          id="user_name"
          onChange={handleChange}
        />
      </form>
      <div></div>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: {
      users_data: data,
    },
  };
}
