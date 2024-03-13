import Link from "next/link";

export default function RegisterPage() {

    return (
        <div>
            <h1>Register Page</h1>
            Sudah punya akun? Login <Link href={"/auth/login"}>disini</Link>
        </div>
    )
}