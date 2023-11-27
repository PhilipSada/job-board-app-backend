const { postJob, getJobById, updateJob, deleteJob } = require("../controller/jobController");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controller/userController");
const validateToken = require("../middleware/validateToken");
const JobModel = require("../models/job");

function routes(app) {
  app.get("/healthcheck", (req, res) => {
    return res.send("App is looking good");
  });

  // get all jobs
  app.get("/all-jobs", async (req, res) => {
    const jobs = await JobModel.find().sort({ createdAt: -1 });
    res.send(jobs);
  });

  // get single job using id
  app.get("/all-jobs/:id", getJobById);


  app.post("/register", registerUser);

  app.post("/login", loginUser);

  app.put("/update-job/:id", validateToken, updateJob);
  app.patch("/update-job/:id", validateToken, updateJob);

  app.get("/current-user", validateToken, currentUser);

  app.post("/post-job", validateToken, postJob);

  app.delete("/job/:id", validateToken, deleteJob);

}

module.exports = routes;
