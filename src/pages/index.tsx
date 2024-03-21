import Head from "next/head";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Hello, {data && data.user.email}</h1>
    </div>
  )
}