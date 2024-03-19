import fetcher from "@/lib/swr/fetcher";
import ProductView from "@/views/Product";
import DetailProduct from "@/views/Product/DetailProduct";
import {ProductType} from "@/types/Product.type";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DetailProductPage({product}: {product: ProductType[] }) {
    const {query} = useRouter();

    /* Client-side */
    const { data, isLoading } = useSWR(
        `/api/product/${query.product}`,
        fetcher
    );

    return (
        <div>
            {/* Client-side */}
            <DetailProduct product={isLoading || !data ? [] : data.data} />
            
            {/* Server-side / Static-site Generation */}
            {/* <DetailProduct product={product} /> */}
        </div>
    );
}

// Server-Side 
// export async function getServerSideProps({
//     params
// }: {
//     params: {product: string, isLoading: boolean}
// }) {
//     console.log(params.product);
//     // fetch data
//     const res = await fetch(`http://localhost:3000/api/product/${params.product}`);
//     const response = await res.json();

//     return {
//         props: {
//             product: response.data,
//         }
//     }
// }


// Static-Site-Generation
// export async function getStaticPaths() {
//     const res = await fetch("http://localhost:3000/api/product");
//     const response = await res.json();

//     const paths = response.data.map((product: ProductType) => ({
//         params: { 
//             product: product.id.toString()
//         },
//     }));
//     return {
//         paths,
//         fallback: true,
//     };
// }
// export async function getStaticProps({
//     params
// }: {
//     params: {product: string, isLoading: boolean}
// }) {
//     console.log(params.product);
//     // fetch data
//     const res = await fetch(`http://localhost:3000/api/product/${params.product}`);
//     const response = await res.json();

//     return {
//         props: {
//             product: response.data,
//         }
//     }
// }