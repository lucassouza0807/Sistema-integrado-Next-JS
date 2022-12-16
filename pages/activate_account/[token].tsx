import { useRouter } from 'next/router'
import { useState } from 'react';


export default function ActivateAccount(props: any) {
    console.log(props);

    return (
        <div className="relative top-[300px]">
            <h1 className='font-bold text-[4rem] text-center'> {props.response.message} </h1>
        </div>
    )
}

export async function getServerSideProps({ query }: any) {
    const response = await fetch(`http://localhost:8000/api/v1/activate_account/${query.token}`, {
        headers: { 
            "api_secret" : process.env.NEXT_PUBLIC_API_SECRET
        }
    });

    const data = await response.json();

    return {
        props: {
            response: data
        }
    }

}