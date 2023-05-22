import React, { useState, useEffect } from 'react';
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import axios from 'axios';

export default function InscriptionForm() {
  const [medecins, setMedecins] = useState([]);
  const [cabinetsMedicaux, setCabinetsMedicaux] = useState([]);

  const [typeUtilisateur, setTypeUtilisateur] = useState('assistant');
  const [medecin, setMedecin] = useState('');
  const [cabinetMedical, setCabinetMedical] = useState('');

// Chargement initial des cabinets
  useEffect(() => {
    const fetchCabinets = async () => {
      try {
        const cabinetsResponse = await axios.get('http://localhost:5000/cabinetMedical');
        console.log('Cabinets Response:', cabinetsResponse.data);
        setCabinetsMedicaux(cabinetsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des cabinets:', error);
      }
    };
    fetchCabinets();
  }, []);

// Chargement des médecins en fonction du cabinet sélectionné
  useEffect(() => {
    if (cabinetMedical) {
      const fetchMedecins = async () => {
        try {
          const medecinsResponse = await axios.get(`http://localhost:5000/medecin?cabinet=${cabinetMedical}`);
          console.log('Medecins Response:', medecinsResponse.data);
          setMedecins(medecinsResponse.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des medecins:', error);
        }
      };
      fetchMedecins();
    }
  }, [cabinetMedical]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const motDePasse = e.target.elements.password.value;
    const nom = e.target.elements.nom.value;
    const prenom = e.target.elements.prenom.value;
    const telephone = e.target.elements.telephone.value;
    const adresse = e.target.elements.adresse.value;
    const typeUtilisateur = e.target.elements.typeUtilisateur.value;

    let userObj = {
      email,
      motDePasse,
      nom,
      prenom,
      telephone,
      adresse,
      typeUtilisateur,
    };

    if (typeUtilisateur === 'assistant') {
      userObj.medecin = medecin;
      userObj.cabinetMedical = cabinetMedical;
      try {
        let response = await axios.post('http://localhost:5000/assistant', userObj);
        console.log("User data sent: ", userObj);
        console.log("Server response: ", response.data);
      }
      catch (error) {
        console.error("Error sending data: ", error);
      }
    } else {
      console.log("User is not an assistant, data not sent.");
    }
  };


    return (
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* Inscription section */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Inscription
            </h4>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Fill in your details to register!
            </p>
            <form onSubmit={handleSubmit}>
              {/* Nom */}
              <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Nom*"
                  placeholder="Votre nom"
                  id="nom"
                  type="text"
              />

              {/* Prenom */}
              <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Prenom*"
                  placeholder="Votre prenom"
                  id="prenom"
                  type="text"
              />

              {/* Email */}
              <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Email*"
                  placeholder="mail@example.com"
                  id="email"
                  type="text"
              />

              {/* Password */}
              <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Password*"
                  placeholder="Min. 8 characters"
                  id="password"
                  type="password"
              />

              {/* Telephone */}
              <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Telephone*"
                  placeholder="Votre telephone"
                  id="telephone"
                  type="text"
              />

              {/* Adresse */}
              <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Adresse*"
                  placeholder="Votre adresse"
                  id="adresse"
                  type="text"
              />

              {/*// TypeUtilisateur*/}
              <label className="mb-3" htmlFor="typeUtilisateur">Type d'utilisateur*</label>
              <select id="typeUtilisateur" onChange={(e) => setTypeUtilisateur(e.target.value)} className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option value="assistant">assistant</option>
                <option value="patient">Patient</option>
                <option value="medecin">Médecin</option>
              </select>


              {typeUtilisateur === 'assistant' && (
                  <>
                    {/*// Medecin*/}
                    {/*<label className="mb-3" htmlFor="medecin">Medecin*</label>*/}
                    {/*<select id="medecin" onChange={(e) => { setMedecin(e.target.value); console.log('Medecin Selected:', e.target.value); }} className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">*/}
                    {/*  {medecins.map((medecin) => (*/}
                    {/*      <option key={medecin._id} value={medecin._id}>{medecin.name}</option>*/}
                    {/*  ))}*/}
                    {/*</select>*/}

                    {/*// CabinetMedical*/}
                    <label className="mb-3" htmlFor="cabinetMedical">CabinetMedical*</label>
                    <select id="cabinetMedical" onChange={(e) => { setCabinetMedical(e.target.value); console.log('Cabinet Selected:', e.target.value); }} className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
                      {cabinetsMedicaux.map((cabinet) => (
                          <option key={cabinet._id} value={cabinet._id}>{cabinet.name}</option>
                      ))}
                    </select>
                  </>
              )}


              <button
                  type="submit"
                  className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                S'inscrire
              </button>
            </form>
            <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Déjà enregistré?
          </span>
              <a
                  href=" "
                  className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Se connecter
              </a>
            </div>
          </div>
        </div>
    );}
