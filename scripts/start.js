const [_, __, exercise, ...args] = process.argv;

if (!exercise) {
  throw new Error("Pass exercise number as an argument (e.g. node start.js 4");
}

const exercises = {
  '4': () => {
    console.log('TODO');
  }
};

if (!(exercise in exercises)) {
  throw new Error("Invalid exercise number");
}

console.log(`Exercise ${exercise}`);

exercises[exercise](...args);
