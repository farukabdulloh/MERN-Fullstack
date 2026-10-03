import mongoose from "mongoose";

const paylipsSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee',
    },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true },

}, { timestamps: true })

const Paylips = mongoose.models.Paylips || mongoose.model('Payslips', paylipsSchema)

export default Paylips;