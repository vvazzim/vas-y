import React from 'react';
import axios from 'axios';


export default function BouttonAjouterP({ closeModal }) {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      nom: event.target.lastName.value,
      prenom: event.target.firstName.value,
      email: event.target.email.value,
      motDePasse: event.target.password.value,
      telephone: event.target.phone.value,
      adresse: event.target.address.value,
      //dateDeNaissance: event.target.dateOfBirth.value, // assuming you have an input field for this
      //sexe: event.target.sex.value, // assuming you have an input field for this
    };


    try {
      const response = await axios.post('http://localhost:5000/Patient', newUser);
      if (response.status === 200) {
        console.log("Utilisateur ajouté avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur", error);
    }
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm bg-opacity-50">
        <div className="bg-white dark:bg-navy-700 rounded-lg shadow-lg w-full max-w-md">
          <div className="p-4">
            <div className="flex justify-between items-center pb-4 mb-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ajouter Utilisateur</h3>
              <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  onClick={closeModal}
              >
                <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                  <input type="text" name="lastName" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Saisissez le nom" required="" />
                </div>
                <div>
                  <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
                  <input type="text" name="firstName" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Saisissez le prénom" required="" />
                </div>
              </div>

              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Saisissez l'email" required="" />
              </div>

              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Saisissez le mot de passe" required="" />
              </div>

              <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
                <input type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Saisissez le numéro de téléphone" required="" />
              </div>

              <div>
                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
                <input type="text" name="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Saisissez l'adresse" required="" />
              </div>

              <div class="mt-4">
                <button type="submit" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Ajouter
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
  )
}