const fs = require("fs").promises;
const mongoose = require("mongoose");
const JobModel = require("./models/job");


async function db() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Check if there's any existing data in the database
    const existingDataCount = await JobModel.countDocuments();
    
    // seed data if existingDataCount === 0
    if (existingDataCount === 0) {
      // Read JSON file
    //   const jsonData = await fs.readFile(path.join(__dirname, 'data', 'jobs.json'), 'utf-8');
      const jsonData = await fs.readFile("./src/data/jobs.json", "utf-8");
      const data = JSON.parse(jsonData);

      // Iterate through job items and save to MongoDB
      for (const jobData of data) {
        // Read HTML content from the file
        // const htmlPath = jobData.descriptionPath;
        // const description = await fs.readFile(htmlPath, "utf-8");

        // Create a new job document
        const newJob = new JobModel({
          companyName: jobData.companyName,
          jobTitle: jobData.jobTitle,
          companyLogo: jobData.companyLogo,
          minPrice: jobData.minPrice,
          maxPrice: jobData.maxPrice,
          salaryType: jobData.salaryType,
          jobLocation: jobData.jobLocation,
          postingDate: jobData.postingDate,
          experienceLevel: jobData.experienceLevel,
          employmentType: jobData.employmentType,
          jobLink:jobData.jobLink,
          // description: description,
          skills:jobData.skills,
          defaultPostedBy:"ADMIN",
        });

        // Save the job to MongoDB
        await newJob.save();
        console.log(`Job saved: ${jobData.jobTitle}`);
      }

      console.log("Data seeding completed successfully");
    } else {
      console.log("Data already exists in the database. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
  //   finally {
  //     // Close the MongoDB connection
  //     mongoose.connection.close();
  //   }
}

module.exports = db;
