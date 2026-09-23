import mongoose from 'mongoose'

const LeaveApplicationScheam = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.ObjectId, ref: 'Employee', require: true, },
    type: {
        type: String, enum: ['SICK', 'CASUAL', 'ANNUAL'],
        require: true
    },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    reason: { type: String, require: true },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
}, { timestamps: true })

const LeaveApplication = mongoose.model.LeaveApplication || mongoose.model('LeaveApplication', LeaveApplicationScheam)
export default LeaveApplication;