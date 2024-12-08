// Validate Pakistani phone number
exports.validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
  return phoneRegex.test(phoneNumber);
};


// Validate Pakistani CNIC
exports.validateCNIC = (cnic) => {
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
  return cnicRegex.test(cnic);
};