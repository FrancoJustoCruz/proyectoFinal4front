import React, { useEffect } from 'react';
import Layout from './Layout';
import FormEditCategoria from '../components/FormEditCategoria';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditCategorias = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
    const { id } = useParams(); // Obtener el parámetro de la URL (id de la categoría a editar)

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
                <h1 className="text-4xl font-bold mb-4">Editar Categoría</h1>
                <FormEditCategoria categoryId={id} />
            </div>
        </Layout>
    );
};

export default EditCategorias;