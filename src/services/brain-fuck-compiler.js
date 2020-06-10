import $B from 'brain-fuck';

export default function (program, input, config = {}) {
  const $bf = new $B(program, input, config);

  return new Promise((resolve, reject) => {
    try {
      resolve($bf.compile());
    } catch (err) {
      reject(err.message);
    }
  });
}
