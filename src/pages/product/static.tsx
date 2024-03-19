<<<<<<< HEAD
import ProductView from "@/views/Product";
import {ProductType} from '@/types/Product.type';

export default function ProductPage(props: { products: ProductType[] }) {
    return (
        <div>
            <ProductView products={props.products} />
=======
// Static-Site Generation
// gak bisa run build

import ProductView from "@/views/Product";
import {ProductType} from "@/types/Product.type";

export default function ProductPage(props: {products: ProductType[]}) {
    const {products} = props;
    return (
        <div>
            <ProductView products={products} />
>>>>>>> master
        </div>
    );
}

<<<<<<< HEAD
// Dipanggil setiap melakukan request
export async function getStaticProps() {
    // fetch data
    const res = await fetch("http://localhost:3000/api/product");
    const response = await res.json();

    return {
        props: {
            products: response.data
=======
export async function getStaticProps() {
    // fetch data
    const res = await fetch('http://localhost:3000/api/product');
    const response = await res.json();
    console.log(response);

    return {
        props: {
            products: response.data,
>>>>>>> master
        }
    }
}