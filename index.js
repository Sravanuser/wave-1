import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import studyRoutes from './routes/studyroutes.js'
import siteRoutes from './routes/siteroutes.js'
import subjectRoutes from './routes/subjectroutes.js'
import screeningRoutes from './routes/screeningroutes.js'
import authenticationRoutes from './routes/authenticationroute.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use('/api/auth', authenticationRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/screenings', screeningRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected successfully")
    })
    .catch((err) => {
        console.log("something went wrong", err.message)
    })


app.listen(PORT, () => {
    console.log("Running successfull at port", PORT)
})