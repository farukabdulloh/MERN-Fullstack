import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
import employeesRoutes from './routes/employeesRoutes.js'
import payslipsRouter from "./routes/paylipsRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";


import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express()
const PORT = process.env.PORT || 4000

// Midleware
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))


// Routes
app.get('/', (req, res) => res.send('Server is running'))

// Vercel invokes the exported Express app as a function. Keep database
// connection setup inside the request lifecycle instead of blocking startup.
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeesRoutes)
app.use('/api/profile', profileRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/paylips', payslipsRouter)
app.use('/api/dashboard', dashboardRouter)

app.use("/api/inngest", serve({ client: inngest, functions }));

export default app;

// Vercel manages the HTTP listener. Start one only for local development.
if (process.env.VERCEL !== '1') {
    connectDB()
        .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
        .catch((error) => {
            console.error('Server startup failed:', error.message);
            process.exitCode = 1;
        });
}
