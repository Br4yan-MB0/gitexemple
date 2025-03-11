import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({ message: 'Username is required for deletion.' });
      }

      // Check if the user exists
      const [existingUser] = await pool.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (existingUser.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Delete the user from the database
      const [result] = await pool.query(
        'DELETE FROM users WHERE username = ?',
        [username]
      );

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: `User '${username}' deleted successfully.` });
      } else {
        return res.status(500).json({ message: 'Failed to delete user.' });
      }
    } catch (error) {
      console.error('Error in delete handler:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}