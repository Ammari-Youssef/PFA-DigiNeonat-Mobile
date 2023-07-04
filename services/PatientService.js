import axios from 'axios';

export const getPatientData = async (id_patient) => {
    try {
        const response = await axios.get(`https://localhost/api/patient/${id_patient}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};