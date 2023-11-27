const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    companyName: {type: String, required:true},
    jobTitle: {type: String, required:true},
    companyLogo: {type: String, required:true},
    minPrice: {type: String, required:true},
    maxPrice: {type: String, required:true},
    salaryType: {type: String, required:true},
    jobLocation: {type: String, required:true},
    postingDate: {type: String, required:true},
    experienceLevel: {type: String, required:true},
    employmentType: {type: String, required:true},
    description: {type: String},
    defaultPostedBy:{type: String},
    jobLink:{type:String, required:true},
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    skills:[{value: {type: String, required:true}, label:{type:String, required:true}}]
}, {
    timestamps: true
});

const JobModel = mongoose.model("Job", schema);

module.exports = JobModel;