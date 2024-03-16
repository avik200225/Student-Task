const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3200;

// MongoDB Connection
mongoose.connect('mongodb://localhost/student_tasks')
  .then(()=>console.log('Database is Connected'))
  .catch(()=>console.log('Database is Not Connected'))
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// TASK Schema
const taskSchema = new mongoose.Schema({
  courseId: String,
  taskName: String,
  dueDate: Date,
  additionalDetails: String,
});

const Task = mongoose.model('Task', taskSchema);


// Route to retrieve tasks for a specific course
app.get('/courses/:courseId/tasks', async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const tasks = await Task.find({ courseId: courseId });
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this course' });
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//COURSES Schema
 const courseSchema = new mongoose.Schema({
  courseId: String,
  courseName: String,
  additionalDetails: String,
 });

 const Course = mongoose.model('Course', courseSchema);

// Route 
app.get('/courses/:courseId/course', async (req, res) => {
   const courseId = req.params.courseId;
 try {
   const course = await Task.find({ courseId: courseId });
   if (course.length === 0) {
      return res.status(404).json({ message: 'No Course found' });
   }
  res.json(course);
   } catch (err) {
    res.status(500).json({ message: err.message });
   }
 });

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
