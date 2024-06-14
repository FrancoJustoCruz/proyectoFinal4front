import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            getUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Residentes</h1>
            <h2 className="text-2xl font-semibold mb-4">Lista de Residentes</h2>
            <Link
                to="/users/add"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
            >
                Add New
            </Link>
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Rol</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.uuid} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">
                                <Link
                                    to={`/users/edit/${user.uuid}`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => deleteUser(user.uuid)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;