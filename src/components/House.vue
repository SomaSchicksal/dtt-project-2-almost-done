<template>
    <!-- Basic house component that will be rendered every time you see 
        an house listing in the application -->
    <div v-if="house">
        <!-- If the madeByMe property is true im gonna rendere the data of the houses im 
            creating, otherwise ill just render the data of the houses from the api-->

        <div v-if="house && house.madeByMe">
            <h1>{{ house.city }}</h1>
            <h1>{{ house.street }}</h1>
            <img :src="imageUrl ? imageUrl : (house.image ? house.image : 'default-image-url')" alt="House Image">
            <h1>{{ house.number }}</h1>
            <h1>{{ house.addition }}</h1>
            <h1>{{ house.postalCode }}</h1>
            <h1>{{ house.price }}</h1>
            <h1>{{ house.size }}</h1>
            <h1>{{ house.garage }}</h1>
            <h1>{{ house.bedrooms }}</h1>
            <h1>{{ house.bathrooms }}</h1>
            <h1>{{ house.constructionDate }}</h1>
            <h1>{{ house.details }}</h1>

        </div>

        <div v-else>
            <img :src="house.image">
            <div>
                <h1>city:{{ house.location ? house.location.city : '' }}</h1>
                <h1>street:{{ house.location ? house.location.street : '' }}</h1>
                <h1>number:{{ house.location ? house.location.houseNumber : '' }}</h1>
                <h1>Price: {{ house.price }}</h1>
                <h1>size:{{ house.size }}</h1>
                <h1>bed:{{ house.rooms ? house.rooms.bedrooms : '' }}</h1>
                <h1>bath:{{ house.rooms ? house.rooms.bathrooms : '' }}</h1>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    // these are the props that im going to get from the parent components, 
    //i just need an house object and a url for the image
    props: {
        house: {
            type: Object,
            required: true,
        },

        imageUrl: {
            type: String,
            default: "", // Set a default value or leave it as an empty string
        },

    },

    mounted() {
        // Logs the received props to the console
        console.log('Received props in House component:', this.house);
    },




}

</script>