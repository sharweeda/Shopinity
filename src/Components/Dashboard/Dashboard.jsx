    import React, { useContext, useMemo } from "react";
    import { ProductContext } from "../../Context/ProductContext";
    import ClipLoader from "react-spinners/ClipLoader"; // نفس الـ Spinner

    export default function Dashboard() {
    const { products, loading } = useContext(ProductContext);

    const stats = useMemo(() => {
        const total = products.length;
        const avgPrice = (products.reduce((sum, p) => sum + p.price, 0) / total).toFixed(2);
        const maxProduct = products.reduce((prev, curr) => (prev.price > curr.price ? prev : curr), {});
        const minProduct = products.reduce((prev, curr) => (prev.price < curr.price ? prev : curr), {});
        return { total, avgPrice, maxProduct, minProduct };
    }, [products]);

    if (loading) {
        return (
        <div className="flex justify-center items-center h-[50vh]">
            <ClipLoader color="#2563EB" size={60} />
        </div>
        );
    }

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">📊 Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card title="عدد المنتجات" value={stats.total} />
            <Card title="متوسط السعر" value={`$${stats.avgPrice}`} />
            <Card title="أعلى سعر" value={`${stats.maxProduct?.title?.slice(0, 15)} - $${stats.maxProduct?.price}`} />
            <Card title="أقل سعر" value={`${stats.minProduct?.title?.slice(0, 15)} - $${stats.minProduct?.price}`} />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="min-w-full border rounded shadow">
            <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                <th className="p-2 text-left">الصورة</th>
                <th className="p-2 text-left">المنتج</th>
                <th className="p-2 text-left">السعر</th>
                <th className="p-2 text-left">القسم</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p) => (
                <tr key={p.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-2">
                    <img src={p.image} alt={p.title} className="h-12 w-12 object-contain" />
                    </td>
                    <td className="p-2">{p.title}</td>
                    <td className="p-2">${p.price}</td>
                    <td className="p-2">{p.category}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    }

    function Card({ title, value }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-md transition">
        <h2 className="text-gray-500 dark:text-gray-300 text-sm">{title}</h2>
        <p className="text-xl font-bold dark:text-white">{value}</p>
        </div>
    );
    }
