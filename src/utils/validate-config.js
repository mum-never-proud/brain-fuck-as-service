export default function validateConfig (config, fields) {
  for (const field of fields) {
  	if (typeof field === 'object') {
      const result = !config.hasOwnProperty(field[0]) || validateConfig(config[field[0]], field[1]);

      if (!result || !result.isValid) {
        return {
          isValid: false,
          missingField: result.hasOwnProperty('missingField') ? result.missingField : field[0]
        };
      }
    } else if (!config.hasOwnProperty(field)) {
    	return {
        isValid: false,
        missingField: field
      };
    }
  }

  return { isValid: true };
}
