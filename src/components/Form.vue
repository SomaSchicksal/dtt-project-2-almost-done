<template>
    <!-- Basic form component that will be rendered every time you see 
        a form in the application -->
    <div v-if="house">
        <form @submit.prevent="submitForm" novalidate>
            <!-- each field is binded to a property of the house object
            , when i type on the field the property is updated and 
            a function is fired that checks for validation errors. 
            If a validation error is present a error message will be conditionally rendered
         -->
            <label for="streetName">House Street:</label>
            <input v-model="house.street" type="text" id="streetName" required
                @input="validateTextField('street', house.street)">
            <h1 v-if="msg['street']">Error: {{ msg['street'] }}</h1>

            <label for="houseNumber">House Number:</label>
            <input v-model="house.number" type="text" id="houseNumber" required
                @input="validateNumberField('number', house.number)">
            <h1 v-if="msg['number']">Error: {{ msg['number'] }}</h1>


            <label for="houseAddition">House Addition:</label>
            <input v-model="house.addition" type="text" id="houseAddition"
                @input="validateTextField('addition', house.addition)">
            <h1 v-if="msg['addition']">Error: {{ msg['addition'] }}</h1>

            <label for="housePostalCode">House Postal Code:</label>
            <input v-model="house.postalCode" type="text" id="housePostalCode" required
                @input="validateNumberField('postalCode', house.postalCode)">
            <h1 v-if="msg['postalCode']">Error: {{ msg['postalCode'] }}</h1>

            <label for="houseCity">House City:</label>
            <input v-model="house.city" type="text" id="houseCity" required @input="validateTextField('city', house.city)">
            <h1 v-if="msg['city']">Error: {{ msg['city'] }}</h1>

            <label for="houseImage">House Image:</label>
            <input type="file" id="houseImage" @change="handleImageUpload" required>
            <img :src="imageUrl">

            <label for="housePrice">House Price:</label>
            <input v-model="house.price" type="text" id="housePrice" required
                @input="validateNumberField('price', house.price)">
            <h1 v-if="msg['price']">Error: {{ msg['price'] }}</h1>

            <label for="houseSize">House Size:</label>
            <input v-model="house.size" type="text" id="houseSize" required
                @input="validateNumberField('size', house.size)">
            <h1 v-if="msg['size']">Error: {{ msg['size'] }}</h1>

            <label for="houseGarage">House Garage:</label>
            <select v-model="house.garage" id="houseGarage" required>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label for="houseBedrooms">House Bedrooms:</label>
            <input v-model="house.bedrooms" type="text" id="houseBedrooms" required
                @input="validateNumberField('bedrooms', house.bedrooms)">
            <h1 v-if="msg['bedrooms']">Error: {{ msg['bedrooms'] }}</h1>

            <label for="houseBathrooms">House Bathrooms:</label>
            <input v-model="house.bathrooms" type="text" id="houseBathrooms" required
                @input="validateNumberField('bathrooms', house.bathrooms)">
            <h1 v-if="msg['bathrooms']">Error: {{ msg['bathrooms'] }}</h1>

            <label for="houseConstructionDate">House Construction Date:</label>
            <input v-model="house.constructionDate" type="text" id="houseConstructionDate" required>

            <label for="houseDetails">House Details:</label>
            <input v-model="house.details" type="text" id="houseDetails" required
                @input="validateTextField('details', house.city)">
            <h1 v-if="msg['details']">Error: {{ msg['details'] }}</h1>

            <!-- if all the required fields arent completed an error message
            will be conditionally rendered -->


            <div v-if="!isFormValid" class="error-message">
                <h1>{{ isEditMode ? "" : "Please complete all required fields. " }}</h1>
            </div>

            <!-- a function will be fired if u press the post button that 
            creates a new house -->

            <button v-if="isEditMode"  type="submit">Save</button>
            <button v-else :disabled="!isFormValid" type="submit">Post</button>
        </form>
    </div>
    <div v-else>
        <h1>Loading...</h1>
    </div>
</template>

<script>
export default {

    data() {
        return {
            hello: "",
        }
    },

    props: {
        house: {
            type: Object,
            required: true
        },

        imageUrl:{
            type:String
        },

        isEditMode: {
            type: Boolean,
            default: false,
        },

        handleImageUpload: {

        },

        msg: {
            type: Array
        },

        isFormValid: {

        },

        validateNumberField: {

        },

        validateTextField: {

        },

        submitForm: {

        }
    },

    created() {
        console.log('Received props in House component:', this.house)
    }
}
</script>