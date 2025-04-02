import pool from '../../lib/db';

export default async function handler(req, res) {
  // Verifica se a requisição é do tipo GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Realiza a consulta ao banco de dados
    const [rows] = await pool.query(`
      SELECT id, username, profile_picture, description, skills 
      FROM users 
      WHERE online = 1 AND skills IS NOT NULL 
      ORDER BY RAND() 
      LIMIT 5
    `);

    // Retorna a resposta com o status 200 e os dados em formato JSON
    res.status(200).json(rows);
  } catch (error) {
    // Caso ocorra um erro, exibe no console e retorna um erro 500
    console.error('Erro ao buscar usuários para o Match:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}
