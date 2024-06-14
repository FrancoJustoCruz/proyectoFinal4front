import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const FormAddIncidencia = () => {
    const [categoriaId, setCategoriaId] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('pendiente');
    const [categorias, setCategorias] = useState([]);
    const [imagen, setImagen] = useState(null);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategorias();

        // Escuchar el evento 'incidenciaCreada' desde el servidor
        socket.on('incidenciaCreada', handleIncidenciaCreada);

        return () => {
            // Desuscribirse del evento 'incidenciaCreada' al desmontar el componente
            socket.off('incidenciaCreada', handleIncidenciaCreada);
        };
    }, []);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error fetching categorias:', error);
            setMsg('Error al cargar las categorías. Inténtelo de nuevo más tarde.');
        }
    };

    const saveIncidencia = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('categoriaId', categoriaId);
        formData.append('descripcion', descripcion);
        formData.append('estado', estado);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            await axios.post('http://localhost:3000/api/incidencias', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/incidencias');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                console.error('Error saving incidencia:', error);
                setMsg('Error al guardar la incidencia. Inténtelo de nuevo más tarde.');
            }
        }
    };

    // Manejador para el evento 'incidenciaCreada'
    const handleIncidenciaCreada = (incidencia) => {
        // Mostrar notificación de incidencia creada
        setMsg(`¡Incidencia creada exitosamente! ID: ${incidencia.id}`);
    };

    // Función para capitalizar la primera letra de la descripción
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Incidencias</h1>
            <h2 className="text-2xl font-semibold mb-6">Agregar Nueva Incidencia</h2>
            <div className="bg-white shadow-md rounded-lg">
                <div className="p-6">
                    <form onSubmit={saveIncidencia} encType="multipart/form-data">
                        <p className="text-center text-red-500">{msg}</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                                    value={categoriaId}
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={descripcion}
                                onChange={(e) => setDescripcion(capitalizeFirstLetter(e.target.value))}
                                placeholder="Descripción"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Imagen</label>
                            <input
                                type="file"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setImagen(e.target.files[0])}
                            />
                        </div>

                        <input
                            type="hidden"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        />

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormAddIncidencia;