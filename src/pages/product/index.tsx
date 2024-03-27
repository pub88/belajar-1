import { fetcher } from "@/lib/swr/fetcher";
import ProductView from "@/views/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const { push } = useRouter();

    useEffect(() => {
        if (!isLogin) {
            push("/auth/login");
        }
    }, []);

    const { data, error, isLoading } = useSWR("/api/product", fetcher);

    return (
        <ProductView products={isLoading || !data ? [] : data.data}/>
    )
    // useEffect(() => {
    //         fetch("/api/product")
    //         .then((res) => res.json())
    //         .then((response) => {
    //                 setProducts(response.data);
    //             });
    //         }, []);

    //         return (
    //     <div>
    //         <ProductView products={products} />
    //     </div>
    // );

    // return (
    //     <div>
    //         {error ? (
    //         <p>Error fetching products: {error.message}</p>
    //         ) : isLoading ? (
    //         <p>Loading products...</p>
    //         ) : data ? (
    //         <ProductView products={data.data} /> // Assuming data holds the actual product data
    //         ) : (
    //         <p>No products found.</p> // Handle the case where data might be empty
    //         )}
    //     </div>
    // );
}