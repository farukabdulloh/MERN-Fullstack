import mongoose from "mongoose";
import { DEPARTMENTS } from "../constants/departements.js";

const employeeSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    basicSalary: { type: Number, default: 0 },
    allownaces: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    employementStatus: { type: String, enum: ['ACITVE', 'INACTIVE'], default: "default" },
    joinDate: { type: Date, required: true },
    isDeleted: { type: Boolean, required: true },
    bio: { type: String, default: '' },
    departement: { type: String, enum: DEPARTMENTS }

}, { timestamps: true })

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema)

export default Employee;