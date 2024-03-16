import { fetcher } from "@/lib/swr/fetcher";
import ProductView from "@/views/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function ProductPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [products, setProducts] = useState([]);
    const {push} = useRouter();
    useEffect(() => {
        if (!isLogin) {
            push("/auth/login");
        }
    }, []);

    const { data, error, isLoading } = useSWR("/api/product", fetcher);

//    useEffect(() => {
    //         fetch("/api/product")
    //         .then((res) => res.json())
    //         .then((response) => {
        //             setProducts(response.data);
        //         });
        //     }, []);
        
    console.log(products);

    // return (
    //     <ProductView products={isLoading ? [] : data.data}/>
    // )

    return (
        <ProductView products={isLoading || !data ? [] : data.data}/>
    )
}
//# sourceMappingURL=react_devtools_backend_compact.js.map