const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   dob: {
      type: Date,
      required: true
   },
   salary: {
      type: Number,
      required: true
   },
   skills: {
      type: [String],
      required: true
   },
   empno: {
      type: Number
   }
   /*img: {
      data: Buffer,
      contentType: String
   }*/
}, {
      collection: 'employees'
   });

EmployeeSchema.plugin(AutoIncrement, { id:'emp_seq', inc_field: 'empno' });
const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = {Employee};