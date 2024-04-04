
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()

// rota get que retorna todos os registros no banco de dados
routes.get('/', async (req, res)=>{
   try{
        const { recordset } =  await pool.query`select * from Agendamentos`
        return res.status(200).json(recordset)
   }
   catch(error){
        return res.status(501).json('não encontramos os registros :( ')
   }
})

//registrando chamado novo
routes.post('/agendamento/novo', async (req, res)=>{
    try{
        const { data_agendamento, horario, reserva } = req.body;
        await pool.query`insert into Agendamentos values(${data_agendamento},${horario},${reserva} )`
        return res.status(201).json(`ok`)
    }

    catch(error){
        return res.status(501).json('erro ao inserir ): ')
    }
})

routes.delete('/agendamento/excluir/:id' , async (req,res) =>{
    try {
        const { id } = req.params
        await pool.query`delete from Agendamentos where id= ${id}`
        return res.status(200).json('agendamento deletado')
    }

    catch(error){
        return res.status(501).json('excluiu nao')
    }
})




export default routes