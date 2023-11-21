<template>
  <router-link to="/houseForm"><button>create</button></router-link>
  <input v-model="search" placeholder="search for a house" @input="filterHouses" />
  <span v-if="search !== ''" @click="clearSearchInput" class="clear-button">&#10006;</span>
  <button @click="sortByPrice">Price</button>
  <button @click="sortBySize">Size</button>
  <div class="result-indication" v-if="filteringOccurred">
    <p v-if="filteredHouses.length > 0">
      {{ filteredHouses.length }} result{{ filteredHouses.length !== 1 ? 's' : '' }} found.
    </p>
    <p v-else>No results found.</p>
  </div>
  <div class="home" v-for="house in houses" :key="house.id">
    <router-link :to='{ name: "house-details", params: { id: house.id } }'>
      <House :house="house"></House>
    </router-link>


  </div>
</template>

<script>
// @ is an alias to /src

import House from '@/components/House.vue';


export default {
  data() {
    return {
      houses: [],
      search: "",
      filteredHouses: [],
      filteringOccurred:false

    }
  },
  name: 'HomeView',
  components: {

  },
  methods: {
    getHouses() {
      this.houses = [];
      this.$store.dispatch("fetchApiData").then(() => {
        this.houses = this.$store.state.apiData;


      })
    },

    sortByPrice() {
      this.houses.sort((a, b) => a.price - b.price);
    },

    sortBySize() {
      this.houses.sort((a, b) => a.size - b.size);
    },



    filterHouses() {
      
      const searchTerm = this.search.toLowerCase();
      this.houses = this.$store.state.apiData.filter((house) => {
        return house.location.city.toLowerCase().includes(searchTerm)
          || house.location.zip.toLowerCase().includes(searchTerm)
          || house.size.toString().includes(searchTerm)
          || house.price.toString().includes(searchTerm);
      });
      this.filteredHouses=this.houses;
      this.filteringOccurred=true;
      

    },

    clearSearchInput() {
      this.search = '';
      this.getHouses()
      
    }
  },

  computed: {
    filteredHouses() {
      const searchTerm = this.search.toLowerCase();
      return this.houses.filter((house) => {
        const cityMatch = house.location.city.toLowerCase().includes(searchTerm);
        const zipMatch = house.location.zip.toLowerCase().includes(searchTerm);


        const sizeMatch = house.size.toString().includes(searchTerm);
        const priceMatch = house.price.toString().includes(searchTerm);

        return cityMatch || zipMatch || sizeMatch || priceMatch;
      })
    }
  },



  mounted() {
    this.getHouses();
    console.log(this.houses);


  },

  components: {House}

}
</script>

<style scoped>
/* Style for the clear button */
.clear-button {
  cursor: pointer;
  color: #999; /* Adjust the color as needed */
  margin-left: 5px; /* Adjust the spacing as needed */
}
</style>