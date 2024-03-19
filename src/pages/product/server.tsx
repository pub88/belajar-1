import ProductView from "@/views/Product";
import {ProductType} from '@/types/Product.type';

export default function ProductPage(props: { products: ProductType[] }) {
    return (
        <div>
            <ProductView products={props.products} />
        </div>
    );
}

// Dipanggil setiap melakukan request
export async function getServerSideProps() {
    // fetch data
    const res = await fetch("http://localhost:3000/api/product");
    const response = await res.json();

    return {
        props: {
            products: response.data
        }
    }
}