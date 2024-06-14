import React, { useState, useEffect } from 'react';
import edificio from '../../public/edificio.png';
import showIcon from '../../public/show.svg';
import unshowIcon from '../../public/unshow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../features/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Definir iconos
    const showIconComponent = <img src={showIcon} alt="Show Password" className="w-4 h-4" />;
    const hideIconComponent = <img src={unshowIcon} alt="Hide Password" className="w-4 h-4" />;

    return (
        <section className="min-h-screen bg-gradient-to-br from-customBlueBoton to-sky-200 flex items-center justify-center">
            <div className="w-full max-w-md">
                <img src={edificio} alt="Edificio" className="w-full mb-[-5rem] h-[18rem] rounded-t" />
                <form onSubmit={handleLogin} className="bg-white shadow-2xl relative rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-6 text-center text-customBlueBoton">Sign In</h1>
                    {isError && <p className="text-red-500 text-center mb-4">{message}</p>}
                    <div className="mb-4">
                        <label className="block text-customBlueBoton text-sm font-bold mb-2">Email</label>
                        <input 
                            type="text" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-customBluefuerte leading-tight focus:outline-none focus:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-cyan-500/50" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-customBlueBoton text-sm font-bold mb-2">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-customBluefuerte leading-tight focus:outline-none focus:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-cyan-500/50" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="*********" 
                            />
                            <button 
                                type="button" 
                                onClick={toggleShowPassword} 
                                className="absolute inset-y-0 right-0 px-3 py-2 pb-2 flex items-center focus:outline-none"
                            >
                                {showPassword ? hideIconComponent : showIconComponent}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                            type="submit" 
                            className={`bg-customBlueBoton hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:shadow-outline w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;