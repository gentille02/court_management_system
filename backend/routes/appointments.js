import express from 'express';
import pool from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

router.post('/', authenticate, authorize('client'), upload.array('documents', 5), async (req, res) => {
  const { service, date, description } = req.body;
  const clientId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO appointments (client_id, service, date, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [clientId, service, date, description]
    );

    const appointmentId = result.rows[0].id;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await pool.query(
          'INSERT INTO documents (appointment_id, filename, filepath) VALUES ($1, $2, $3)',
          [appointmentId, file.originalname, file.path]
        );
      }
    }

    res.status(201).json({ message: 'Appointment booked successfully', appointment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to book appointment', error: err.message });
  }
});

router.get('/my', authenticate, authorize('client'), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM appointments WHERE client_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC',
      [req.user.id]
    );
    const formatted = result.rows.map(apt => ({
      ...apt,
      date: formatDate(apt.date),
      created_at: formatDate(apt.created_at)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: err.message });
  }
});

router.get('/assigned', authenticate, authorize('judge'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, u.name as client_name, u.email as client_email 
       FROM appointments a 
       JOIN users u ON a.client_id = u.id 
       WHERE a.judge_id = $1 AND a.deleted_at IS NULL
       ORDER BY a.date`,
      [req.user.id]
    );

    const appointments = await Promise.all(result.rows.map(async (apt) => {
      const docs = await pool.query('SELECT * FROM documents WHERE appointment_id = $1', [apt.id]);
      return { 
        ...apt, 
        clientName: apt.client_name,
        date: formatDate(apt.date),
        created_at: formatDate(apt.created_at),
        documents: docs.rows.map(doc => ({
          name: doc.filename,
          url: `http://localhost:5000/${doc.filepath.replace(/\\/g, '/')}`
        }))
      };
    }));

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cases', error: err.message });
  }
});

router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, u.name as client_name, u.email as client_email 
       FROM appointments a 
       JOIN users u ON a.client_id = u.id 
       ORDER BY a.created_at DESC`
    );

    const appointments = await Promise.all(result.rows.map(async (apt) => {
      const docs = await pool.query('SELECT * FROM documents WHERE appointment_id = $1', [apt.id]);
      return { 
        ...apt, 
        date: formatDate(apt.date),
        created_at: formatDate(apt.created_at),
        documents: docs.rows.map(doc => ({
          name: doc.filename,
          url: `http://localhost:5000/${doc.filepath.replace(/\\/g, '/')}`
        }))
      };
    }));

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: err.message });
  }
});

router.patch('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  const { status, remarks } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE appointments SET status = $1, remarks = $2 WHERE id = $3 RETURNING *',
      [status, remarks, req.params.id]
    );
    res.json({ message: 'Status updated', appointment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
});

router.patch('/:id/reschedule', authenticate, authorize('admin', 'judge'), async (req, res) => {
  const { date, remarks } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE appointments SET date = $1, status = $2, remarks = $3 WHERE id = $4 RETURNING *',
      [date, 'Rescheduled', remarks, req.params.id]
    );
    res.json({ message: 'Appointment rescheduled', appointment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reschedule', error: err.message });
  }
});

router.patch('/:id/remarks', authenticate, authorize('judge'), async (req, res) => {
  const { remarks } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE appointments SET remarks = $1 WHERE id = $2 RETURNING *',
      [remarks, req.params.id]
    );
    res.json({ message: 'Remarks saved', appointment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save remarks', error: err.message });
  }
});

router.patch('/:id/assign', authenticate, authorize('admin'), async (req, res) => {
  const { judgeId } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE appointments SET judge_id = $1 WHERE id = $2 RETURNING *',
      [judgeId, req.params.id]
    );
    res.json({ message: 'Judge assigned', appointment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign judge', error: err.message });
  }
});

router.put('/:id', authenticate, authorize('client'), async (req, res) => {
  const { service, date, description } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE appointments SET service = $1, date = $2, description = $3 WHERE id = $4 AND client_id = $5 AND status = $6 RETURNING *',
      [service, date, description, req.params.id, req.user.id, 'Pending']
    );
    
    if (result.rows.length === 0) {
      return res.status(403).json({ message: 'Cannot update approved/rejected appointments' });
    }
    
    res.json({ message: 'Appointment updated', appointment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update appointment', error: err.message });
  }
});

router.delete('/:id', authenticate, authorize('client'), async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE appointments SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND client_id = $2 AND status = $3 RETURNING *',
      [req.params.id, req.user.id, 'Pending']
    );
    
    if (result.rows.length === 0) {
      return res.status(403).json({ message: 'Cannot delete approved/rejected appointments' });
    }
    
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete appointment', error: err.message });
  }
});

router.get('/deleted', authenticate, authorize('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, u.name as client_name, u.email as client_email 
       FROM appointments a 
       JOIN users u ON a.client_id = u.id 
       WHERE a.deleted_at IS NOT NULL
       ORDER BY a.deleted_at DESC`
    );
    
    const formatted = result.rows.map(apt => ({
      ...apt,
      date: formatDate(apt.date),
      deleted_at: formatDate(apt.deleted_at)
    }));
    
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch deleted appointments', error: err.message });
  }
});

export default router;
