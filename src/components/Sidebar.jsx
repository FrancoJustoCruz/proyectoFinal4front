import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoPerson, IoPricetag, IoHome, IoLogOut, IoAlertCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate('/');
    };

    return (
        <aside className="fixed inset-y-0 left-0 w-64 bg-customBlueBoton shadow-md overflow-y-auto mt-[7rem]">
            <div className="p-4 mt-4">
                <p className="text-lg font-extrabold text-white mb-2">General</p>
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to='/dashboard'
                            className="flex items-center text-gray-200 hover:text-white hover:font-extrabold py-2 px-4 rounded transition duration-300 ease-in-out"
                            activeClassName="bg-gray-200 text-black"
                        >
                            <IoHome className="mr-2" />Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/incidencias'
                            className="flex items-center text-gray-200 hover:text-white hover:font-extrabold py-2 px-4 rounded transition duration-300 ease-in-out"
                            activeClassName="bg-gray-200 text-black"
                        >
                            <IoAlertCircle className="mr-2" />Incidencias
                        </NavLink>
                    </li>
                </ul>
            </div>
            {user && user.role === 'admin' && (
                <div className="p-4 mt-4">
                    <p className="text-lg font-extrabold text-white mb-2">Admin</p>
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to='/users'
                                className="flex items-center text-gray-200 hover:text-white hover:font-extrabold py-2 px-4 rounded transition duration-300 ease-in-out"
                                activeClassName="bg-gray-200 text-black"
                            >
                                <IoPerson className="mr-2" />Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/categorias'
                                className="flex items-center text-gray-200 hover:text-white hover:font-extrabold py-2 px-4 rounded transition duration-300 ease-in-out"
                                activeClassName="bg-gray-200 text-black"
                            >
                                <IoPricetag className="mr-2" />Categorías
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
            <div className="p-4 mt-4">
                <p className="text-lg font-extrabold text-white mb-2">Settings</p>
                <ul className="space-y-2">
                    <li>
                        <button onClick={logout} className='flex items-center text-gray-200 hover:text-white hover:font-extrabold py-2 px-4 rounded transition duration-300 ease-in-out'>
                            <IoLogOut className="mr-2" />Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;