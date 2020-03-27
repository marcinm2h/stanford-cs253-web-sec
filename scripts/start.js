const path = require("path");
const { readdirSync } = require("fs");
const { exec } = require("child_process");

const [_, __, exercise, ...args] = process.argv;

if (!exercise) {
  throw new Error(
    "Pass exercise directory name as an argument (e.g. node start.js 04-cors"
  );
}

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const exercises = getDirectories(path.resolve(".")).filter(
  dir => ![".git", "node_modules", "scripts"].includes(dir)
);

if (!exercises.includes(exercise)) {
  throw new Error("Invalid exercise name");
}

const startScriptPath = require.resolve(
  path.join(__dirname, "..", exercise, "start.sh")
);

console.log(`Exercise ${exercise}`);
const childProcess = exec(`sh ${startScriptPath}`);
childProcess.stdout.pipe(process.stdout);

process.on("SIGINT", () => {
  childProcess.kill("SIGINT");
  process.exit();
});
