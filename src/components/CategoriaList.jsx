import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Modal'; // Asegúrate de tener implementado el componente Modal
import { useDispatch, useSelector } from 'react-redux';

const CategoriaList = () => {
    const [categorias, setCategorias] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };

    const deleteCategoria = async (categoriaId) => {
        try {
            await axios.delete(`http://localhost:3000/api/categorias/${categoriaId}`);
            fetchCategorias();
        } catch (error) {
            console.error('Error deleting categoria:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Categorías</h1>
            <h2 className="text-2xl font-semibold mb-4">Listado de Categorías</h2>
            {user && user.role === 'admin' && (
                <Link
                    to="/categorias/add"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
                >
                    Agregar Nueva
                </Link>
            )}
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-customBlueBoton">
                        <th className="border px-4 py-2 text-white font-extrabold">No</th>
                        <th className="border px-4 py-2 text-white font-extrabold">Nombre</th>
                        <th className="border px-4 py-2 text-white font-extrabold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria, index) => (
                        <tr
                            key={categoria.id}
                            className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                        >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{categoria.nombre}</td>
                            <td className="border px-4 py-2">
                                {user && user.role === 'admin' && (
                                    <>
                                        <button
                                            onClick={() => deleteCategoria(categoria.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriaList;