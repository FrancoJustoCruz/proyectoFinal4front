import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FormEditCategoria = ({ categoryId }) => {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Función para obtener los detalles de la categoría por su ID
        const fetchCategoria = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/categorias/${categoryId}`);
                setNombre(response.data.nombre);
            } catch (error) {
                console.error('Error al obtener la categoría:', error);
                setError('Error al obtener los detalles de la categoría.');
            }
        };
        
        fetchCategoria(); // Llamar a la función al montar el componente
    }, [categoryId]); // Dependencia para volver a obtener los detalles si cambia el ID de la categoría

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/categorias/${categoryId}`, { nombre });
            navigate('/categorias'); // Redirigir a la lista de categorías después de editar
        } catch (error) {
            console.error('Error al editar la categoría:', error);
            setError('Error al procesar la solicitud.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre de la Categoría</label>
                <input
                    type="text"
                    id="nombre"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Guardar Cambios
            </button>
        </form>
    );
};

export default FormEditCategoria;