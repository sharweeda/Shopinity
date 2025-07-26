import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setProducts(data);
      setFilteredProducts(data);
      extractCategories(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching products. Please try again later.");
      setLoading(false);
    }
  }

  function extractCategories(data) {
    const cats = [...new Set(data.map((p) => p.category))];
    setCategories(cats);
  }

  useEffect(() => {
    filterAndSortProducts();
  }, [search, sort, selectedCategory]);

  function filterAndSortProducts() {
    let filtered = [...products];

    //  Search
    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    //  Category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    //  Sort
    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "name-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(filtered);
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#3B82F6" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
         {error}
      </div>
    );

  return (
    <div className="p-4">
      {/*  Search + Sort + Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-1/3"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">ترتيب حسب</option>
          <option value="price-asc">السعر: من الأقل للأعلى</option>
          <option value="price-desc">السعر: من الأعلى للأقل</option>
          <option value="name-asc">الاسم: A-Z</option>
          <option value="name-desc">الاسم: Z-A</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="all">كل التصنيفات</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/*  Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            to={`/productDetails/${product.id}`}
            key={product.id}
            className="border rounded-lg shadow hover:shadow-lg p-4 transition-transform hover:scale-105 bg-white"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain"
            />
            <h2 className="font-semibold text-lg mt-2 line-clamp-1 text-center">
              {product.title}
            </h2>
            <p className="text-center text-gray-700 font-bold">
              ${product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
