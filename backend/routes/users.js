import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/me', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, phone, staff_id FROM users WHERE id = $1",
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: err.message });
  }
});

router.get('/judges', authenticate, authorize('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, staff_id FROM users WHERE role = 'judge' ORDER BY name"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch judges', error: err.message });
  }
});

// Create a new user (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const { name, email, password, phone, role, staffId } = req.body;

  try {
    // Validate role
    if (!['judge', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Only judge and admin can be created by admin.' });
    }

    // For admin role, staff ID is required
    if (role === 'admin' && !staffId) {
      return res.status(400).json({ message: 'Staff ID is required for admin users' });
    }

    // Validate staff ID format for admins (ADN-XXX)
    if (role === 'admin' && staffId) {
      if (!staffId.startsWith('ADN-')) {
        return res.status(400).json({ message: 'Staff ID must start with ADN-' });
      }
      // Check if staff ID is unique
      const existingStaffId = await pool.query(
        'SELECT id FROM users WHERE staff_id = $1',
        [staffId]
      );
      if (existingStaffId.rows.length > 0) {
        return res.status(400).json({ message: 'Staff ID already exists' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (name, email, password, phone, role, staff_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, staff_id',
      [name, email, hashedPassword, phone || null, role, role === 'admin' ? staffId : null]
    );

    res.status(201).json({ 
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} created successfully`, 
      user: result.rows[0] 
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
});

// Get all users (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, phone, staff_id, created_at FROM users ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// Update user (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { name, email, phone, role } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING id, name, email, role, phone, staff_id',
      [name, email, phone || null, role, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
});

// Toggle user active status (admin only)
router.patch('/:id/toggle-status', authenticate, authorize('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    // For now, this endpoint is a placeholder for future implementation
    res.json({ message: 'User status toggled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle user status', error: err.message });
  }
});

export default router;
