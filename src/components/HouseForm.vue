<template>
    <div>
        <Form 
        :house="newHouse"
        :handleImageUpload="handleImageUpload"
        :msg="msg"
        :isFormValid="isFormValid"
        :validateNumberField="validateNumberField"
        :validateTextField="validateTextField"
        :submitForm="submitForm"
        :isEditMode="isEditMode"></Form>
    </div>
</template>

<script>

import Form from "./Form.vue"


export default {
    data() {
        return {
            houses: [],
            houseImage: null,
            isHouseNumberValid: true,
            msg: [],
            isEditMode:false,

            newHouse: {
                street: "",
                number: null,
                addition: "",
                postalCode: null,
                city: "",
                image: null,
                price: null,
                size: null,
                garage: "",
                bedrooms: null,
                bathrooms: null,
                constructionDate: null,
                details: "", 
                madeByMe:true
            }
        }
    },



    computed: {
        isFormValid() {

            // Check if all required fields are completed
            return this.newHouse.details.trim() !== ""
                && this.houseImage !== null
                && this.newHouse.street.trim() !== ""
                
                && this.newHouse.city.trim() !== ""
                && this.newHouse.garage.trim() !== ""
                && this.newHouse.constructionDate &&
                (
                    /^\d{2}\/\d{2}\/\d{4}$/.test(this.newHouse.constructionDate) ||
                    /^\d{2}-\d{2}-\d{4}$/.test(this.newHouse.constructionDate)
                )
                && (this.newHouse.price !== null && !isNaN(this.newHouse.price))
                && (this.newHouse.number !== null && !isNaN(this.newHouse.number))
                && (this.newHouse.postalCode !== null && !isNaN(this.newHouse.postalCode))
                && (this.newHouse.size !== null && !isNaN(this.newHouse.size))
                && (this.newHouse.bedrooms !== null && !isNaN(this.newHouse.bedrooms))
                && (this.newHouse.bathrooms !== null && !isNaN(this.newHouse.bathrooms))


                ;




        },
    },



    methods: {
        submitForm() {


            if (this.isFormValid) {
                this.$store.dispatch('addNewHouse', { newHouse: this.newHouse, image: this.houseImage });

                const index = this.$store.state.myListings.length - 1;
                

                // Redirect to the details page with the index as a parameter
                this.$router.push({ name: 'myhouse-details', params: { index } });

                
            }

        },

        handleImageUpload(event) {
            const file = event.target.files[0];

            // Check if a file was selected
            if (file) {
                // You can now use this file (image) as needed
                this.houseImage = file;
                
            }
        },

        validateNumberField(fieldName, value) {
            if (/^[0-9]+$/.test(value)) {
                this.msg[fieldName] = '';
            } else {
                this.msg[fieldName] = 'Invalid input. Please enter a number.';
            }
        },

        validateTextField(fieldName, value) {
            if (/^[a-zA-Z]+$/.test(value)) {
                this.msg[fieldName] = '';
            } else {
                this.msg[fieldName] = 'Invalid input. Please enter a letter.';
            }
        },




    },

    components: {Form}
}
</script>