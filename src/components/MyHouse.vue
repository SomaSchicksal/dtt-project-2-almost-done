<template>
  <div>
    <button @click="goToEditPage">edit</button>
    <button @click="showDeletionConfirm">Delete</button>
    <DeletionConfirmPopup v-if="showPopup" @confirmed="deleteHouse" @canceled="cancelDeletion"></DeletionConfirmPopup>
    
    <House :house="house" :imageUrl="imageUrl"></House>
  </div>
</template>

<script>
import DeletionConfirmPopup from './DeletionConfirmPopup.vue';
import House from './House.vue';

export default {
  data() {
    return {
      house: {},
      imageUrl: null,
      showPopup: false
    };
  },
  mounted() {
    const houseIndex = this.$route.params.index;
    const selectedHouse = this.$store.state.myListings[houseIndex];
    if (selectedHouse) {
      this.house = selectedHouse;
      this.loadImage();
    }
    else {
      // Handle the case where the house is not found, e.g., redirect to an error page
      console.error(`House at index ${houseIndex} not found.`);
    }
  },
  methods: {
    loadImage() {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      // Assuming that house.image is the File object
      reader.readAsDataURL(this.house.image);
    },
    goToEditPage() {
      const index = this.$store.state.myListings.length - 1;
      // Redirect to the details page with the index as a parameter
      this.$router.push({ name: "edit-house", params: { index } });
    },
    deleteHouse() {
      const index = this.$store.state.myListings.length - 1;
      this.$store.dispatch("deleteHouse", index);
      this.showPopup = false;
      this.$router.push({ name: "home"});
    },
    showDeletionConfirm() {
      // Set showPopup to true to display the popup
      this.showPopup = true;
    },
    cancelDeletion() {
      this.showPopup=false;
    }
  },
  components: { DeletionConfirmPopup, House }
}

</script>