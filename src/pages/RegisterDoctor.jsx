import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './RegisterDoctor.css';

const RegisterDoctor = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        especialidad: '',
        registro_medico: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);


        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/doctors/register`, formData);

            Swal.fire({
                icon: 'success',
                title: '¡Médico Registrado!',
                text: response.data.message
            });

            setFormData({
                nombre: '',
                email: '',
                especialidad: '',
                registro_medico: ''
            });

        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar al médico',
                text: error.response?.data?.error || 'Hubo un problema en el servidor'
            });
        }finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-form-container">
            <h2>Registrar Nuevo Médico</h2>
            <p>Ingresa los datos del profesional. </p>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Nombre Completo: </label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Correo Electronico (ej. andres@clinica.com): </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Contraseña: </label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Especialidad: </label>
                    <input type="text" name="especialidad" value={formData.especialidad} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Registro médico: </label>
                    <input type="text" name="registro_medico" value={formData.registro_medico} onChange={handleChange} required className="form-input" />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-submit">
                    {isSubmitting ? 'Guardando...' : 'Registro Médico'}
                </button>
            </form>
        </div>
    );
}

export default RegisterDoctor;