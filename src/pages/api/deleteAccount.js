import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({ message: 'Authorization token is required.' });
    }

    // Extract token from header (Authorization: Bearer token)
    const token = authorization.split(' ')[1];

    // Secure environment variable usage
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error('Missing JWT secret.');
      return res.status(500).json({ message: 'Internal server error.' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, jwtSecret);

      // Define file path to find users
      const filePath = path.join(process.cwd(), 'login.encrypt');

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'No registered users found.' });
      }

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const users = JSON.parse(fileContent);

      // Find the user by username
      const userIndex = users.findIndex((u) => u.username === decoded.username);

      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Remove the user from the array
      users.splice(userIndex, 1);

      // Save the updated user list back to the file
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

      return res.status(200).json({ message: 'Account deleted successfully.' });
    } catch (error) {
      console.error('Error processing the request:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
