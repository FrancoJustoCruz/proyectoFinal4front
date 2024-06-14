import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditIncidencia = () => {
    const [descripcion, setDescripcion] = useState('');
    
    const [categoriaId, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/incidencias/${id}`);
                setDescripcion(response.data.descripcion);
                
                setCategoriaId(response.data.categoriaId);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };

        fetchData();

       
        axios.get('http://localhost:3000/api/categorias')
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error('Error fetching categorias:', error);
            });
    }, [id]);

    const updateIncidencia = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/api/incidencias/${id}`, {
                descripcion: descripcion,
                
                categoriaId: categoriaId,
            });
            navigate('/incidencias');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Incidencias</h1>
            <h2 className="text-2xl font-semibold mb-6">Editar Incidencia</h2>
            <div className="bg-white shadow-md rounded-lg">
                <div className="p-6">
                    <form onSubmit={updateIncidencia}>
                        <p className="text-center text-red-500">{msg}</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Descripción de la incidencia"
                            />
                        </div>
                       
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    value={categoriaId}
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categorias.map(categoria => (
                                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormEditIncidencia;