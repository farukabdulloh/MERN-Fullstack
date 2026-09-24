import mongoose from "mongoose";

const paylipsSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Paylips',
    },
    month: { type: Number, require: true },
    year: { type: Number, require: true },
    basicSalary: { type: Number, require: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, require: true },

}, { timestamps: true })

const Paylips = mongoose.models.Paylips || mongoose.model('Payslips', paylipsSchema)

export default Paylips;