import pool from '../../lib/db';

export default async function handler(req, res) {
    try {
      const [rows] = await pool.query('SELECT username FROM users ORDER BY RAND() LIMIT 5');
  
      // Garante que a resposta seja um array, mesmo que vazio
      if (!Array.isArray(rows)) {
        res.status(200).json([]);
        return;
      }
  
      res.status(200).json(rows);
    } catch (error) {
      console.error('Erro ao buscar usuários recomendados:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários recomendados' });
    }
  }
  