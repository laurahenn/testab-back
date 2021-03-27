import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
      
    const { email, senha } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      senha,
    })

    return response.json({ user, token });
    
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
