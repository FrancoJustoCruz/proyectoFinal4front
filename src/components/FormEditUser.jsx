import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [role, setRole] = useState('');
    const [msg, setMsg] = useState('');
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${id}`);
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/api/users/${id}`, {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role,
            });
            navigate('/users');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Users</h1>
            <h2 className="text-2xl font-semibold mb-6">Update User</h2>
            <div className="bg-white shadow-md rounded-lg">
                <div className="p-6">
                    <form onSubmit={updateUser}>
                        <p className="text-center text-red-500">{msg}</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="*********"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                placeholder="*********"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                            <div className="select is-fullwidth">
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
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

export default FormEditUser;