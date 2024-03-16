// Client-Side Rendering

import ProductView from "@/views/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import useSWR from "swr";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [products, setProducts] = useState([]);
    const {push} = useRouter();

    useEffect(() => {
        if (!isLogin) {
            push("/auth/login");
        }
    }, []);
    
    useEffect(() => {
            fetch("/api/product")
            .then((res) => res.json())
            .then((response) => {
                    setProducts(response.data);
                });
            }, []);
            
            return (
        <div>
            <ProductView products={products} />
        </div>
    );
    
    // const { data, error, isLoading } = useSWR("/api/product", fetcher);
    // console.log(data);
    // console.log(error);
    // console.log(isLoading);
    
    // // if (error) return <div>Failed to load</div>
    // // if (!data) return <div>Loading...</div>
    
    // // console.log(data)
    
    // // return (
    //     //     <>
    //     //         <div> Useful data </div>
    //     //     </>
    // // )
    
    // // return (
    //     //     <div>
    //     //         <ProductView products={isLoading ? [] : data.data} />
    //     //     </div>
    // // );

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