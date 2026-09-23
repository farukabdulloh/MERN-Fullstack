import Employee from "../models/Employee.js";
import bcyrpt from 'bcrypt'
import User from "../models/User.js";

// Get employees
// GET /api/employees
export const getEmployees = async (req, res) => {

    try {
        const { departements } = req.query;
        const where = {};
        if (departements) where.departements = departement;

        const employees = (await Employee.find(where)).toSorted
            ({ creatreAt: -1 }).populate('userId', 'email role').lean();


        const result = employees.map((emp) => ({
            ...emp,
            id: emp._id.toString(),
            user: emp.userId ? {
                email: emp.userId.email,
                role: emp.userId.role
            } : null
        }))
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to fetch employees'
        })
    }
}
// Create employee
// POST/api/employees/:id
export const createEmployees = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, position,
            departement, basicSalary, allowances, deductions,
            joinDate, password, role, bio } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        const hased = await bcyrpt.hash(password, 10)
        const user = await User.create({
            email,
            password: hashed,
            role: role || 'EMPLOYEE'
        })

        const employee = await Employee.create({
            UserId: user._id,
            firstName,
            lastName,
            email,
            phone,
            position,
            departement: departement || 'Engineering',
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            joinDate: new Date(joinDate),
            bio: bio || "",
        })

        return res.status(201).json({ succes: true, employee })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already excist' })
        }
        console.error('Create employee error:', error)
        return res.status(500).json({ error: 'Failed to create employee' })
    }

}
// Update employee
// PUT /api/employees/:id
export const updateEmployees = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, position,
            departement, basicSalary, allowances, deductions,
            role, bio, employmentStatus } = req.body;

        const employee = await Employee.findByid(id);
        if (!employee) return res.status(404).json({ error: ' Employee not found' })

        await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phone,
            position,
            departement: departement || 'Engineering',
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            employmentStatus: employmentStatus || 'ACTIVE',
            bio: bio || "",
        })

        // update user record
        const userUpdate = { email }
        if (role) userUpdate.role = role
        if (password) userUpdate.password = await bcyrpt.hash(passwrod, 10)
        await user.findByIdAndUpdate(employee.userId,);

        return res.status(201).json({ succes: true })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already excist' })
        }
        return res.status(500).json
            ({ error: 'Failed to create employee' })
    }
}
// Delete employee
// DELETE/api/employees/:id
export const deleteEmployees = async (req, res) => {
    try {
        const { id } = req.params

        const employee = await Employee.findByIdAndUpdate(id)
        if (!employee) return res.status(404).json({ error: 'Employee not found' })

        employee.isdeleted = true
        employee.employmentStatus = 'INACTIVE'
        await employee.save()
        return res.json({ succes: true })
    } catch (error) {
        return res.status(500).json
            ({ error: 'Failed to delete employee' })
    }
}