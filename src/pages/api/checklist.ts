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

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()

    const query = `
      INSERT INTO vehicle_check (
        operacional, viatura, oleo, agua_radiador, agua_vidros, triangulo,
        pneus, colete, combustivel, km_viatura, revisao, luzes_viatura,
        iluminacao_emergencia, avaria
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12,
        $13, $14
      )
    `

    const values = [
      data.operacional,
      data.viatura,
      data.oleo,
      data.agua_radiador,
      data.agua_vidros,
      data.triangulo,
      data.pneus,
      data.colete,
      data.combustivel,
      data.km_viatura,
      data.revisao,
      data.luzes,
      data.iluminacao,
      data.avaria
    ]

    await pool.query(query, values)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    })
  } catch (err) {
    console.error('Erro no checklist:', err)
    return new Response(JSON.stringify({ success: false, error: 'Erro interno' }), {
      status: 500,
    })
  }
}
