import $B from 'brain-fuck';

export default function (config) {
  const brainFuckHelloWorld = '+[-[<<[+[--->]-[<<<]]]>>>-]>-.---.>..>.<<<<-.<+.>>>>>.>.<<.<-.';

  return new Promise((resolve, reject) => {
    try {
      resolve($B.convert(brainFuckHelloWorld, config));
    } catch (e) {
      reject(e);
    }
  });
}
