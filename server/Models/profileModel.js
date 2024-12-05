const mongoose = require('mongoose');

// Define the schema for the contact details
const contactDetailsSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Validate Pakistani phone number format
        return /^((\+92)|(0092))-?\d{3}-?\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(v);
      },
      message: props => `${props.value} is not a valid Pakistani phone number!`
    }
  },
  address: {
    type: String,
    required: true
  }
});

// Define the schema for the profile
const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  numberOfCities: {
    type: Number,
    required: true
  },
  numberOfBuses: {
    type: Number,
    required: true
  },
  numberOfDrivers: {
    type: Number,
    required: true
  },
  contactDetails: {
    type: contactDetailsSchema,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  }
});

// Create the model
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
