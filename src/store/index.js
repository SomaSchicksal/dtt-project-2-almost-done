


import { createStore } from 'vuex'

export default createStore({
    state: {
        // Define your state properties here
        apiData: [],
        myListings: []
    },
    mutations: {
        // Define your mutation functions here to modify state
        setApiData(state, data) {
            state.apiData = data;
        },

        ADD_NEW_HOUSE(state, { newHouse, image }) {

            const houseWithImage = { ...newHouse, image };
            state.myListings.push(houseWithImage);
            console.log(state.myListings)


        },

        SAVE_HOUSE_CHANGES(state, { index, updatedHouse }) {
            // Update the existing house with the changes
            state.myListings[index] = { ...updatedHouse };

            
        },

        SAVE_HOUSE_IMAGE_CHANGES(state, { index, newImage }) {
            state.myListings[index].image = newImage;
          },

        REMOVE_HOUSE(state, index) {
            state.myListings.splice(index, 1);
        }


    },
    actions: {
        // Define your actions to fetch data and commit mutations
        async fetchApiData({ commit }) {
            // Make an API request here and commit a mutation with the data
            // For example, using Axios as discussed earlier

            const ApiKey = "_0KfzMBqomADtsj7brkVaX1iwRhLgIQN";
            const ApiUrl = "https://api.intern.d-tt.nl/api/houses";

            await fetch(ApiUrl, {
                method: "GET",
                headers: {
                    "X-Api-Key": ApiKey,
                }
            }).then((res) => res.json()).then(data => {
                console.log(data);
                commit("setApiData", data);
                console.log("fetching data...")
            });


        },

        addNewHouse({ commit }, { newHouse, image }) {
            commit("ADD_NEW_HOUSE", { newHouse, image })
        },

        saveHouseChanges({ commit }, { index, house, newImage }) {
            // Commit mutation to save the changes
            commit('SAVE_HOUSE_CHANGES', { index, updatedHouse: house });
            if (newImage) {
                commit('SAVE_HOUSE_IMAGE_CHANGES', { index, newImage });
              }
        },

        deleteHouse({ commit }, index) {
            commit('REMOVE_HOUSE', index);
        }
    },
    getters: {
        // Define getters to access and compute state properties
        getApiData: (state) => state.apiData,
    },
})