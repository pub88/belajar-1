import ProductView from "@/views/Product";

export default function ProductPage(props: {products: ProductType[]}) {
    const {products} = props;
    return (
        <div>
            <ProductView products={products} />
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