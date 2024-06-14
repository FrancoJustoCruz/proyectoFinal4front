import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${productId}`);
            getProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Products</h1>
            <h2 className="text-2xl font-semibold mb-4">List of Products</h2>
            <Link
                to="/products/add"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
            >
                Add New
            </Link>
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Created By</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.uuid} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">{product.price}</td>
                            <td className="border px-4 py-2">{product.user.name}</td>
                            <td className="border px-4 py-2">
                                <Link
                                    to={`/products/edit/${product.uuid}`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteProduct(product.uuid)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;