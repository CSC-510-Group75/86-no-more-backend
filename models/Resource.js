const mongoose = require('mongoose');
   const resourceSchema = new mongoose.Schema({
     name: { type: String, required: true },
     type: { type: String, enum: ['dish', 'cookware', 'utensil',
   'table'], required: true },
     quantity: { type: Number, default: 1 },
     status: { type: String, enum: ['available', 'in-use',
   'needs-replacement'], default: 'available' }
   });
   module.exports = mongoose.model('Resource', resourceSchema);