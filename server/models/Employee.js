import mongoose from "mongoose";
import { DEPARTMENTS } from "../constants/departements.js";

const employeeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        workEmail: {
            type: String,
            required: true,
            unique: true,
        },

        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: String,
            required: true,
        },

        position: {
            type: String,
            required: true,
        },

        basicSalary: {
            type: Number,
            default: 0,
        },

        allowances: {
            type: Number,
            default: 0,
        },

        deductions: {
            type: Number,
            default: 0,
        },

        employmentStatus: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },

        joinDate: {
            type: Date,
            required: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

        bio: {
            type: String,
            default: "",
        },

        profileImage: {
            type: String,
            default: "",
        },

        department: {
            type: String,
            enum: DEPARTMENTS,
        },
    },
    {
        timestamps: true,
    }
);

const Employee =
    mongoose.models.Employee ||
    mongoose.model("Employee", employeeSchema);

export default Employee;