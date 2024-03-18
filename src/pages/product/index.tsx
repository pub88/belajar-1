import fetcher from "@/lib/swr/fetcher";
import ProductView from "@/views/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function ProductPage() {
    const [isLogin, setIsLogin] = useState(true);
    const {push} = useRouter();

    useEffect(() => {
        if (!isLogin) {
            push("/auth/login");
        }
    }, []);

    const { data, isLoading } = useSWR("/api/product", fetcher);

    return (
        <ProductView products={isLoading || !data ? [] : data.data}/>
    );
}