<template>
    <div>
        <h1>Edit page</h1>

        <div>
            <Form :house="house" 
            :handleImageUpload="handleImageUpload" 
            :msg="msg" 
            
            :validateNumberField="validateNumberField" 
            :validateTextField="validateTextField" 
            :submitForm="submitForm"
                
            :isEditMode="isEditMode"
            :imageUrl="imageUrl"></Form>
        </div>
    </div>
</template>
  
<script>

import Form from "./Form.vue"
export default {
    data() {
        return {
            house: {},
            imageUrl: null,
            houseImage:null,
            selectedImage:null,
            msg:[],
            isEditMode:true
        }
    },



    mounted() {
        const houseIndex = this.$route.params.index;
        const selectedHouse = this.$store.state.myListings[houseIndex];

        if (selectedHouse) {
            this.house = { ...selectedHouse };
            this.loadImage();
            console.log(this.house)
        } else {
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
            console.log(this.house.image)
            console.log(this.imageUrl)
        },

        handleImageUpload(event) {
            const file = event.target.files[0];

      if (file) {
        // Set the selected image for further processing if needed
        this.selectedImage = file;

        // Read the file and update the image URL
        this.readImage(file);
        
        
      }
        },

        readImage(file) {
      const reader = new FileReader();

      reader.onload = () => {
        // Update the imageUrl with the base64 data URI of the image
        this.imageUrl = reader.result;
        
        
        
        
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
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

        submitForm() {
            const houseIndex = this.$route.params.index;
            const imageData = this.imageUrl ? { image: this.imageUrl } : {};
            this.house.image=this.selectedImage
            

  this.$store.dispatch('saveHouseChanges', {
    index: houseIndex,
    house: this.house,
    ...imageData,
  });

  

            
            

            

            // Redirect back to the house details page
            this.$router.push({ name: 'myhouse-details', params: { index: houseIndex } });
        }
    },

    components: { Form }
}

</script>