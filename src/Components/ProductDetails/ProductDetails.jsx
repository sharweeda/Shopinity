        import React, { useEffect, useState } from "react";
        import axios from "axios";
        import { useParams } from "react-router-dom";
        import ClipLoader from "react-spinners/ClipLoader";

        export default function ProductDetails() {
        const { id } = useParams(); // 🆔 جاي من الـ URL
        const [product, setProduct] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        useEffect(() => {
        getProduct();
        }, []);

        async function getProduct() {
        try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(data);
        setLoading(false);
        } catch (err) {
        setError("فشل تحميل تفاصيل المنتج.");
        setLoading(false);
        }
        }

        if (loading)
        return (
        <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color="#3B82F6" />
        </div>
        );

        if (error)
        return <div className="text-center text-red-500 mt-10">❌ {error}</div>;

        return (
        <div className="p-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <img
                src={product.image}
                alt={product.title}
                className="h-80 w-full object-contain"
        />
        <div>
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-xl font-semibold text-green-600 mb-2">${product.price}</p>
                <p className="text-sm text-gray-600">التصنيف: {product.category}</p>
                <p className="text-sm text-yellow-500 mt-1">⭐ {product.rating?.rate} ({product.rating?.count} تقييم)</p>
        </div>
        </div>
        );
        }
