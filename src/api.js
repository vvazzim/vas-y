// src/api.js
import axios from 'axios';

export const apiUtilisateur = axios.create({
  baseURL: 'http://localhost:5000/Utilisateur', // The correct URL for user-related requests
});

export const apiAssistant = axios.create({
  baseURL: 'http://localhost:5000/assistant', // The correct URL for assistant-related requests
});

export const apiRdv = axios.create({
  baseURL: 'http://localhost:5000/Rdv', // The correct URL for appointment-related requests
});

// ...

export const ajouterAssistant = async (assistantData) => {
  try {
    assistantData.typeUtilisateur = 'assistant';
    const response = await apiAssistant.post('/', assistantData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error adding assistant');
  }
};

export const ajouterUtilisateur = async (userData) => {
  try {
    const response = await apiUtilisateur.post('/', userData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error adding user');
  }
};

export const obtenirMedecins = async () => {
  try {
    const response = await axios.get('http://localhost:5000/medecin');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error retrieving doctors');
  }
};

export const obtenirCabinetsMedicaux = async () => {
  try {
    const response = await axios.get('http://localhost:5000/cabinetMedical');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error retrieving medical cabinets');
  }
};

export const obtenirRdv = async () => {
  try {
    const response = await apiRdv.get('http://localhost:5000/Rdv');
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


const handleApiError = (error, errorMessage) => {
  if (error.response) {
    console.log(`${errorMessage}:`, error.response.data);
    console.log('Error response status:', error.response.status);
    console.log('Error response headers:', error.response.headers);
  } else if (error.request) {
    console.log(`${errorMessage}: Error request`, error.request);
  } else {
    console.log(`${errorMessage}: Error message`, error.message);
  }
  console.log(`${errorMessage}: Error config`, error.config);
  throw error;
};

export default {
  apiUtilisateur,
  apiAssistant,
  apiRdv,
};
