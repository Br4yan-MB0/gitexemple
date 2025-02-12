import CryptoJS from 'crypto-js';
import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, fullName, email, password, birthDate, bio, preferredLanguage, region, profile_pic } = req.body;

      // Validate input fields
      if (!username || !password || !email || !fullName || !birthDate || !bio || !preferredLanguage || !region || !profile_pic) {
        return res.status(400).json({ message: 'All fields (username, password, email) are required.' });
      }

      const privateKey = process.env.PRIVATE_KEY;
      if (!privateKey) {
        console.error('Missing PRIVATE_KEY in environment variables.');
        return res.status(500).json({ message: 'Internal server error.' });
      }

      // Encrypt the password
      const encryptedPassword = CryptoJS.AES.encrypt(password, privateKey).toString();

      // Check if the username or email already exists
      const [existingUser] = await pool.query(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [username, email]
      );

      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Username or email already taken.' });
      }

      // Insert the new user into the database
      const [result] = await pool.query(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        [username, encryptedPassword, email]
      );

      if (result.affectedRows > 0) {
        return res.status(201).json({ message: 'User registered successfully.' });
      } else {
        return res.status(500).json({ message: 'Failed to register user.' });
      }
    } catch (error) {
      console.error('Error in registration handler:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
