import type { APIRoute } from 'astro'
import { Pool } from 'pg'
import 'dotenv/config'

export const prerender = false; 

const pool = new Pool({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || '5433'),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
})

export const GET: APIRoute = async () => {
  try {
    const query = 'SELECT * FROM vehicle_check ORDER BY id DESC LIMIT 1'  // Fetch the latest check

    const result = await pool.query(query)

    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ success: true, data: result.rows[0] }), {
        status: 200,
      })
    } else {
      return new Response(JSON.stringify({ success: false, message: 'No data found' }), {
        status: 404,
      })
    }
  } catch (err) {
    console.error('Erro ao recuperar os dados do veículo:', err)
    return new Response(JSON.stringify({ success: false, error: 'Erro interno' }), {
      status: 500,
    })
  }
}
