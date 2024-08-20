const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const teamRoutes = require('./routes/teamRoutes');
const videoReviewRoutes = require('./routes/videoReviewRoutes');
const phdHolderRoutes = require('./routes/phdHolderRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const companyRoutes = require('./routes/companyRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authorRoutes = require('./routes/authorRoutes');
const placementRoutes = require('./routes/placementRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const addressRoutes = require('./routes/addressRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); // Adjust the path according to your project structure

const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/video-reviews', videoReviewRoutes);
app.use('/api/phd-holders', phdHolderRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api', addressRoutes);
app.use('/api', serviceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

