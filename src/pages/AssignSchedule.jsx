import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './AssignSchedule.css';

const AssignSchedule = () => {
    const [medicos, setMedicos] = useState([]);
    const [formData, setFormData] = useState({
        doctor_id: '',
        dia_semana: '',
        hora_inicio: '',
        hora_fin: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

   
    const diasSemana = [
        {id: 1, nombre: 'Lunes'},
        {id: 2, nombre: 'Martes'},
        {id: 3, nombre: 'Miercoles'},
        {id: 4, nombre: 'Jueves'},
        {id: 5, nombre: 'Viernes'},
        {id: 6, nombre: 'Sabado'},
        {id: 0, nombre: 'Domingo'},
    ];

    
    useEffect(() => {
        const fetchMedicos = async () => {
            try{
                const response = await axios.get('http://localhost:5000/api/doctors/lista');
                setMedicos(response.data);
            }catch(error){
                console.error("Error al cargar médicos",error);
            }
        };
        fetchMedicos();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsSubmitting(true);

       
        const payload ={
            doctor_id: formData.doctor_id,
            dia_semana: formData.dia_semana,
            hora_inicio: `${formData.hora_inicio}:00`,
            hora_fin: `${formData.hora_fin}:00`
        };

        try{
            const response = await axios.post('http://localhost:5000/api/schedules/add', payload);

            Swal.fire({
                icon: 'success',
                title: 'Hora Asignado',
                text: response.data.message
            });

            
            setFormData({
                ...formData,
                dia_semana: '',
                hora_inicio: '',
                hora_fin: ''
            });

        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error al asignar horario',
                text: error.response?.data?.error || 'Hubo un problema en el servidor'
            });
        }finally{
            setIsSubmitting(false)
        }
    };

    return(
        <div className="schedule-container">
            <h2>Asignar Horario Laboral</h2>
            <p>Selecciona un médico y define sus bloques de atención por día</p>

            <form onSubmit={handleSubmit} className="admin-form">

                <div className="form-group">
                    <label>Médico:</label>
                    <select name="doctor_id" value={formData.doctor_id} onChange={handleChange} required className="form-input">
                       <option value="">Selecciona un médico...</option>
                       {medicos.map(medico => (
                        <option key={medico.id} value={medico.id}>
                            {medico.User?.nombre} - {medico.especialidad}
                        </option>
                       ))} 
                    </select>
                </div>

                <div className="form-group">
                    <label>Día de la semana:</label>
                    <select name="dia_semana" value={formData.dia_semana} onChange={handleChange} required className="form-input">
                        <option value="">Seleccione un día...</option>
                        {diasSemana.map(dia => (
                            <option key={dia.id} value={dia.id}>{dia.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="time-group">
                    <div className="form-group">
                        <label>Hora de Inicio:</label>
                        <input type="time" name="hora_inicio" value={formData.hora_inicio} onChange={handleChange} required className="form-input"/>
                    </div>


                    <div className="form-group">
                        <label>Hora de Fin:</label>
                        <input type="time" name="hora_fin" value={formData.hora_fin} onChange={handleChange} required className="form-input"/>
                    </div>
                </div>

                <button type='submit' disabled={isSubmitting} className="btn-submit">
                    {isSubmitting ? 'Guardando...' : 'Asignar Horario'}
                </button>
            </form>
        </div>
    );
};

export default AssignSchedule;