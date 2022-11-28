import { useRouter } from "next/router";

export default function Produto({ ...props }: any) {
  const router = useRouter();
  const { produto_id } = router.query;

  console.log(props.data);
  return (
    <>
      {props.data.map((data: any, key: number) => (
        <div key={key}>
          <p>Name: {data.name}</p>
          <p>Phone number: {data.phone}</p>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
