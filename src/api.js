// src/api.js
import axios from 'axios';

// Configuring Axios Instances for Different Endpoints
const apiUtilisateur = axios.create({ baseURL: 'http://localhost:5000/Utilisateur' });
export const apiRdv = axios.create({ baseURL: 'http://localhost:5000/Rdv' });
const apiAgenda = axios.create({ baseURL: 'http://localhost:5000/agendas' });
const apiCabinetMedical = axios.create({ baseURL: 'http://localhost:5000/cabinetMedical' });

// Error Handler Function
const handleApiError = (error, errorMessage) => {
  // ... (no changes here)
};

// Patient Functions
export const obtenirPatient = async () => {
  try {
    const response = await apiUtilisateur.get('/', { params: { typeUtilisateur: 'Patient' } });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error retrieving patients');
  }
};

export const ajouterPatient = async (patientData) => {
  try {
    patientData.typeUtilisateur = 'Patient';
    const response = await apiUtilisateur.post('/', patientData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error adding patient');
  }
};

// Assistant Functions
export const ajouterAssistant = async (assistantData) => {
  try {
    const response = await apiUtilisateur.post('/', assistantData, { params: { typeUtilisateur: 'Assistant' }});
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error adding assistant');
  }
};



// Doctor Functions
export const obtenirMedecins = async () => {
  try {
    const response = await apiUtilisateur.get('/', { params: { typeUtilisateur: 'Medecin' } });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error retrieving doctors');
  }
};

export const ajouterMedecin = async (medecinData) => {
  try {
    medecinData.typeUtilisateur = 'Medecin';
    const response = await apiUtilisateur.post('/', medecinData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error adding doctor');
  }
};

// Appointment Functions
export const obtenirRdv = async () => {
  try {
    const response = await apiRdv.get('/');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error retrieving appointments');
  }
};

export const ajouterRdv = async (rdvData) => {
  try {
    const response = await apiRdv.post('/', rdvData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error adding appointment');
  }
};

// Agenda Functions
export const getAgenda = async (userId) => {
  try {
    const response = await apiAgenda.get(`/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error getting agenda');
  }
};

export const ajouterAgenda = async (agendaData) => {
  try {
    const response = await apiAgenda.post('/', agendaData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error adding agenda');
  }
};

// Medical Cabinet Functions
export const obtenirCabinetsMedicaux = async () => {
  try {
    const response = await apiCabinetMedical.get('/');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error retrieving medical cabinets');
  }
};

export const ajouterCabinetMedical = async (cabinetData) => {
  try {
    const response = await apiCabinetMedical.post('/', cabinetData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error adding medical cabinet');
  }
};
