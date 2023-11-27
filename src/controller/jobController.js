const JobModel = require("../models/job");

async function postJob(req, res) {
  const result = req.body;
  // console.log(result);
  try {

    const hasEmptyField = Object.values(result).some(value => value === '');

    if (hasEmptyField) {
      res.status(400).json({ message: 'All fields are mandatory.' });
    } 

    const jobDocument = new JobModel(result);

    await jobDocument.save();
    res.json({ message: "Job posted successfully"});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function getJobById(req, res) {

  try {
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId);
   
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function updateJob(req, res) {

  try {
    const updatedData = req.body;
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId);

    if(!job){
        return res.status(404).json({ message: 'Job not found' });
    }

    //check if the user has permission to update the job
    // if(job.postedBy !== req.user.id){
    //     return res.status(403).json({ message: "You don't have permission to update this job" });
    // }

    const updatedJob = await JobModel.findByIdAndUpdate(jobId, updatedData, { new: true });

    // if (!updatedJob) {
    //   return res.status(404).json({ message: 'Job not found' });
    // }

    // If the job is updated, send the updated job as a JSON response
    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job by ID:', error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function deleteJob(req, res) {

  try {
    const jobId = req.params.id;
    const deletedJob = await JobModel.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });

  } catch (error) {
    console.error('Error deleting job by ID:', error);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = { postJob, getJobById, updateJob, deleteJob };
