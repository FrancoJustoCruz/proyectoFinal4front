import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Modal'; 
import { useDispatch, useSelector } from 'react-redux';

const IncidenciaList = () => {
    const [incidencias, setIncidencias] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIncidencia, setSelectedIncidencia] = useState(null);
    const [editedEstado, setEditedEstado] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [msg, setMsg] = useState('');
    const { user } = useSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getIncidencias();
        fetchCategorias(); 
    }, []);

    const getIncidencias = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/incidencias');
            setIncidencias(response.data);
        } catch (error) {
            console.error('Error fetching incidencias:', error);
        }
    };
    const filteredIncidencias = incidencias.filter(incidencia => {
        return incidencia.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };

    const deleteIncidencia = async (incidenciaId) => {
        try {
            await axios.delete(`http://localhost:3000/api/incidencias/${incidenciaId}`);
            getIncidencias();
        } catch (error) {
            console.error('Error deleting incidencia:', error);
        }
    };

    const openModal = (incidencia) => {
        setSelectedIncidencia(incidencia);
        setEditedEstado(incidencia.estado); 
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedIncidencia(null);
        setModalOpen(false);
    };

    const getStatusCircleClass = (estado) => {
        let circleClass = '';
        switch (estado) {
            case 'pendiente':
                circleClass = 'bg-red-500';
                break;
            case 'En proceso':
                circleClass = 'bg-yellow-500';
                break;
            case 'Atendido':
                circleClass = 'bg-green-500';
                break;
            default:
                circleClass = 'bg-gray-500';
                break;
        }
        return `h-4 w-4 rounded-full inline-block ${circleClass}`;
    };

    const updateEstadoIncidencia = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/incidencias/${selectedIncidencia.uuid}`, {
                estado: editedEstado
            });
            closeModal(); 
            getIncidencias(); 
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    // Función para obtener el nombre de la categoría
    const getCategoriaNombre = (categoriaId) => {
        const categoria = categorias.find(cat => cat.id === categoriaId);
        return categoria ? categoria.nombre : 'Sin categoría';
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Incidencias</h1>
            <h2 className="text-2xl font-semibold mb-4">Listado de Incidencias</h2>
            <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por descripción..."
            />
            <Link to="/incidencias/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
                Agregar Nueva
            </Link>
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Descripción</th>
                        <th className="border px-4 py-2">Estado</th>
                        <th className="border px-4 py-2">Categoría</th>
                        <th className="border px-4 py-2">Creado por</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {filteredIncidencias.map((incidencia, index) => (
                        <tr key={incidencia.uuid} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{incidencia.descripcion}</td>
                            <td className="border px-4 py-4 flex items-center">
                                <span className={`${getStatusCircleClass(incidencia.estado)} mr-2`}></span>
                                {incidencia.estado}
                            </td>
                            <td className="border px-4 py-2">{getCategoriaNombre(incidencia.categoriaId)}</td>
                            <td className="border px-4 py-2">{incidencia.user.name}</td>
                            <td className="border px-4 py-2">
                                <Link
                                    to={`/incidencias/edit/${incidencia.uuid}`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    Editar
                                </Link>
                                {user && user.role === 'admin' && (
                                    <button
                                        onClick={() => openModal(incidencia)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                    >
                                        Revisar
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteIncidencia(incidencia.uuid)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

           
            <Modal isOpen={modalOpen} onClose={closeModal}>
                <div className="text-lg font-semibold mb-2">Descripción:</div>
                <p className="text-gray-800">{selectedIncidencia?.descripcion}</p>
                {selectedIncidencia?.imagen && ( // Mostrar imagen si está disponible
                    <div className="mt-4">
                        <div className="text-lg font-semibold mb-2">Imagen:</div>
                        <img src={`http://localhost:3000/uploads/${selectedIncidencia.imagen}`} alt="Incidencia Imagen" className="max-w-full h-auto" />
                    </div>
                )}
                <div className="text-lg font-semibold mt-4 mb-2">Estado:</div>
                <div className="mb-4">
                    <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        value={editedEstado}
                        onChange={(e) => setEditedEstado(e.target.value)}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Atendido">Atendido</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={updateEstadoIncidencia}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                        Guardar
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default IncidenciaList;