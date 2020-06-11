import { Router } from 'express';
import chalk from 'chalk';
import { read, write, isDuplicateEntry } from '../services/db';
import brainFuckCompiler from '../services/brain-fuck-compiler';
import brainFuckConverter from '../services/brain-fuck-converter';
import brainFuckCreateValidator from './validators/brain-fuck-create';

const router = Router();

router.post('/', brainFuckCreateValidator, (req, res) => {
  isDuplicateEntry(req.body.tokens)
    .then((record) => record ? Promise.resolve(record) : write(req.body))
    .then((record) => Promise.all([ record.id, brainFuckConverter(record) ]))
    .then(([compiler_id, hello_world]) => res.json({
        compiler_id,
        hello_world,
        timestamp: Date.now()
      }).status(200)
    )
    .catch((e) => {
      console.log(chalk`{bold.red error saving config: ${e}}`);

      res.boom.badImplementation();
    });
});

router.post('/compile/:id*?', (req, res) => {
  const { id } = req.params;
  const { program, input } = req.body;

  read(id)
    .then((record) => {
      if (id && !record) {
        throw new Error('compiler not found');
      }

      return brainFuckCompiler(program, input, record || {});
    })
    .then(({ program, input, output, compilationTime, infinite } = {}) => res.json({
      program,
      input,
      output,
      compilationTime,
      infinite,
      timestamp: Date.now()
    }).status(200))
    .catch((e) => {
      console.log(chalk`{bold.red error compiling: ${e}}`);

      res.boom.badRequest(e);
    });
});

export default router;
