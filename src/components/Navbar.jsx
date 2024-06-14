import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../public/logo.png';
import edificiologo from '../../public/logoedificio.png'
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate('/');
    };

    return (
        <div className='absolute'>
            <nav className="fixed top-0 left-0 right-0 bg-customBluemedio shadow-md z-10">
                <div className="flex items-center justify-between p-4">
                    <NavLink to='/dashboard' className="flex items-center pl-12">
                        <img src={edificiologo} width="112" height="50" alt='logo' />
                    </NavLink>
                    <button className="block md:hidden focus:outline-none">
                        <div className="hamburger">
                            <span className="block w-8 h-0.5 bg-black mb-1"></span>
                            <span className="block w-8 h-0.5 bg-black mb-1"></span>
                            <span className="block w-8 h-0.5 bg-black"></span>
                        </div>
                    </button>
                    <div className="hidden md:flex items-center">
                        <button onClick={logout} className="bg-blue-900 hover:bg-customBluefuerte text-white font-extrabold py-2 px-4 rounded focus:outline-none">
                            Log out
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;