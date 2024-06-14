import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${id}`);
                setName(response.data.name);
                setPrice(response.data.price);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getProductById();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/api/products/${id}`, {
                name: name,
                price: price,
            });
            navigate('/products');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Products</h1>
            <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
            <div className="bg-white shadow-md rounded-lg">
                <div className="p-6">
                    <form onSubmit={updateProduct}>
                        <p className="text-center text-red-500">{msg}</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Product name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormEditProduct;