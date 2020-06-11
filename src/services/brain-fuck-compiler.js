import $B from 'brain-fuck';

export default function (program, input, config = {}) {
  const $bf = new $B(program, input, config);

  return new Promise((resolve, reject) => {
    try {
      const output = $bf.compile();

      resolve(output);
    } catch (err) {
      reject(err.message);
    }
  });
}
