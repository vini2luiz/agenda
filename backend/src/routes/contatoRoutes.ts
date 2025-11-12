import { Router } from 'express';
import { ContatoController } from '../controllers/ContatoController';

const router = Router();
const contatoController = new ContatoController();

router.get('/', contatoController.getAll.bind(contatoController));
router.get('/search', contatoController.search.bind(contatoController));
router.get('/:id', contatoController.getById.bind(contatoController));
router.post('/', contatoController.create.bind(contatoController));
router.put('/:id', contatoController.update.bind(contatoController));
router.delete('/:id', contatoController.delete.bind(contatoController));

export default router;

