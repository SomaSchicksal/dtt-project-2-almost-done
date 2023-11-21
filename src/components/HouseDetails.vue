<template>
    <div>
        <h1>house details</h1>
        <div v-if="house && house.length>0">
            <House :house="house[0]"></House>
        </div>
        <div v-else>
            <h1>Loading...</h1>
        </div>
    </div>
</template>

<script>

import House from './House.vue';
export default {
    data() {
        return {
            house: [],
        }
    },

    async created() {
        const houseId = this.$route.params.id;

        const ApiKey = "_0KfzMBqomADtsj7brkVaX1iwRhLgIQN";


        const response= await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
            method: "GET",
            headers: {
                "X-Api-Key": ApiKey,
            }
        }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.house = data;
      });

        

    },

    components :{House}
}
</script>