import { validConfigFields } from '../../constants';
import validateConfig from '../../utils/validate-config';

export default function (req, res, next) {
  if (!req.body) {
    return res.boom.badRequest();
  }

  const result = validateConfig(req.body, validConfigFields);

  if (!result.isValid) {
    return res.boom.badRequest(`missing field ${result.missingField}`);
  }

  return next();
}
