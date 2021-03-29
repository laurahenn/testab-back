import { Router } from 'express';

const getinfosRouter = Router();

getinfosRouter.post('/', async (request, response) => {
  try {
      
    return response.status(200).json({ sucess: "rota Post" });
    
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

getinfosRouter.get('/', async (request, response) => {
  try {
      
    return response.status(200).json({ sucess: "rota Get" });
    
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default getinfosRouter;
