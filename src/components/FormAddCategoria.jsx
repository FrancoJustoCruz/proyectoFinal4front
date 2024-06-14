import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FormAddCategoria = () => {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/categorias', { nombre });
            console.log('Categoria agregada:', response.data);
            navigate('/categorias'); // Redirigir a la lista de categorías después de agregar
        } catch (error) {
            console.error('Error al agregar categoría:', error);
            setError(error.response.data.error || 'Error al procesar la solicitud.');
        }
    };

    const handleInputChange = (e) => {
        setNombre(capitalizeFirstLetter(e.target.value));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre de la Categoría</label>
                <input
                    type="text"
                    id="nombre"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                    value={nombre}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Agregar Categoría
            </button>
        </form>
    );
};

export default FormAddCategoria;