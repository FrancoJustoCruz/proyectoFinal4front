import React, { useEffect } from 'react';
import Layout from './Layout';
import FormAddCategoria from '../components/FormAddCategoria';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const AddCategorias = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-4">Agregar Nueva Categoría</h1>
                <FormAddCategoria />
            </div>
        </Layout>
    );
};

export default AddCategorias;