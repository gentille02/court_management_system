import pool from './config/db.js';

const migrate = async () => {
  try {
    await pool.query(`
      ALTER TABLE appointments 
      ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP;
    `);
    
    console.log('✅ Migration completed: deleted_at column added');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
};

migrate();