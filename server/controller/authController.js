import User from "../models/User.js"
import bcyrpt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Login for employee and admin
// POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password, role_type } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        if (role_type === 'admin' && user.role !== 'ADMIN') {
            return res.status(401).json({ error: 'Not authorized as admin' })
        }

        if (role_type === 'Employee' && user.role !== 'EMPLOYEE') {
            return res.status(400).json({ error: 'Not authorized as Employee' })
        }

        const isValid = await bcyrpt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).
                json({ error: 'Invalid credentials' })
        }

        const payLoad = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        }

        const token = jwt.sign(payLoad, process.env.JWT_SECRET,
            { expiresIn: '7d' })
        return res.json({ user: payLoad, token })

    } catch (error) {
        console.error('Login error:', error)
        return res.status(500).json({ error: 'Login failed!' })
    }
}

// get session for employee and admin
// get /api/auth/session
export const session = (req, res) => {
    const session = req.session
    return res.json({ user: session })
}

// change password for employeee and admin
// POST /api/auth/change-password
export const changePassword = async (req, res) => {
    try {
        const session = req.session
        const { currentPassword, newPassword } = req.body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both passwords are required' })
        }
        const user = await User.findById(session.userId)
        if (!user) return res.status(404).json({ error: 'User not found' })

        const isValid = await bcyrpt.compare(currentPassword, user.password)
        if (!isValid) {
            return res.status(400).
                json({ error: 'password is incorrect' })
        }
        const hashad = await bcyrpt.hash(newPassword, 10)
        await User.findByIdAndUpadate(session.userId, { password: hashed })
        return res.json({ success: true })
    } catch (error) {
        return res.status(500).json({ error: 'Failed to change' })
    }
}