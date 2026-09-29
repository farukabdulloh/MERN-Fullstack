import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Get employees
// GET /api/employees
export const getEmployees = async (req, res) => {
    try {
        const { department } = req.query;

        const where = {
            isDeleted: false,
        };

        if (department) {
            where.department = department;
        }

        const employees = await Employee.find(where)
            .sort({ createdAt: -1 })
            .populate("userId", "email role")
            .lean();

        const result = employees.map((emp) => ({
            ...emp,
            id: emp._id.toString(),
            user: emp.userId
                ? {
                    email: emp.userId.email,
                    role: emp.userId.role,
                }
                : null,
        }));

        return res.json(result);

    } catch (error) {
        return res.status(500).json({
            error: "Failed to fetch employees",
        });
    }
};
// Create employee
// POST/api/employees/:id
export const createEmployees = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            workEmail,
            phoneNumber,
            position,
            department,
            basicSalary,
            allowances,
            deductions,
            date,
            password,
            role,
            bio
        } = req.body;

        if (!workEmail || !password || !firstName || !lastName) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        console.log("STEP 2 - SEBELUM CREATE USER");

        const user = await User.create({
            email: workEmail,
            password: hashed,
            role: role || "EMPLOYEE"
        });


        const employee = await Employee.create({
            userId: user._id,
            firstName,
            lastName,
            workEmail,
            phoneNumber,
            position,
            department: department || "Engineering",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            joinDate: new Date(date),
            bio: bio || "",
            profileImage: req.file ? req.file.path : ""
        });

        return res.status(201).json({
            success: true,
            employee
        });

    } catch (error) {
        console.error("CREATE EMPLOYEE ERROR:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                error: "Duplicate key",
                details: error.keyValue,
            });
        }

        return res.status(500).json({
            error: "Failed to create employee",
        });
    }
};
// Update employee
// PUT /api/employees/:id
export const updateEmployees = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, workEmail, phoneNumber, password, position,
            department, basicSalary, allowances, deductions,
            role, bio, employmentStatus } = req.body;

        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ error: ' Employee not found' })

        await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName,
            workEmail,
            phoneNumber,
            position,
            department: department || 'Engineering',
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            employmentStatus: employmentStatus || 'ACTIVE',
            bio: bio || "",
        })

        // update user record
        const userUpdate = { email: workEmail }
        if (role) userUpdate.role = role
        if (password) userUpdate.password = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate(employee.userId, userUpdate);

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

        const employee = await Employee.findById(id)
        if (!employee) return res.status(404).json({ error: 'Employee not found' })

        employee.isDeleted = true
        employee.employmentStatus = 'INACTIVE'
        await employee.save()
        return res.json({ succes: true })
    } catch (error) {
        return res.status(500).json
            ({ error: 'Failed to delete employee' })
    }
}