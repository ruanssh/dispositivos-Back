import express, { Request, Response } from 'express';
import schoolDataController from '../controllers/schoolDataController';

const schoolDataRoutes = express.Router();

//Buscar todos os registros de SchoolData
schoolDataRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const response = await schoolDataController.list();
        return res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message ?? "Não foi possível realizar essa ação");
    }
});

//Buscar um registro específico pelo ID
schoolDataRoutes.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const response = await schoolDataController.listById(id);
        return res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message ?? "Não foi possível realizar essa ação");
    }
});

//Criar um novo registro
schoolDataRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const response = await schoolDataController.create(data);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message ?? "Não foi possível registrar");
    }
});

//Atualizar um registro existente pelo ID
schoolDataRoutes.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await schoolDataController.update(id, data);
        return res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message ?? "Não foi possível realizar essa ação");
    }
});

//Deletar um registro pelo ID
schoolDataRoutes.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const response = await schoolDataController.delete(id);
        return res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message ?? "Não foi possível realizar essa ação");
    }
});

//Obter materia do usuario por id
schoolDataRoutes.get("/materias/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const materias = await schoolDataController.findMaterias(id);
    return res.status(200).json({ materias });
  } catch (error: any) {
    res.status(500).send(error.message ?? "Erro ao buscar matérias");
  }
});


export default schoolDataRoutes;
