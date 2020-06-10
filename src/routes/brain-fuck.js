import { Router } from 'express';
import { read, write, isDuplicateEntry } from '../services/db';
import brainFuckCompiler from '../services/brain-fuck-compiler';
import brainFuckCreateValidator from './validators/brain-fuck-create';

const router = Router();

router.post('/', brainFuckCreateValidator, (req, res) => {
  isDuplicateEntry(req.body.tokens)
    .then((record) => record ? Promise.resolve(record) : write(req.body))
    .then((record) => res.json({
        status: 'ok',
        compiler_id: record.id,
        timestamp: Date.now()
      }).status(200)
    )
    .catch((e) => {
      console.log(e);

      res.boom.badImplementation();
    });
});

router.post('/compile/:id*?', (req, res) => {
  const {
    params: { id }
  } = req;

  if (id) {
    read(id)
      .then((record) => {
        console.log(brainFuckCompiler('blub. blub?', '', record));
      });
  }
  res.send({ status: 'compiled' });
});

export default router;
