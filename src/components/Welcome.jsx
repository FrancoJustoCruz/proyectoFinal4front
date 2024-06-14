import React from 'react';
import { useSelector } from 'react-redux';

const Welcome = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex items-center justify-center min-h-screen pb-48 pr-12">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 transition-transform hover:scale-105">
                <h1 className="text-2xl font-semibold">
                    Bienvenido, {user && <span className="text-customBlueBoton">{user.name}</span>}
                </h1>
            </div>
        </div>
    );
};

export default Welcome;