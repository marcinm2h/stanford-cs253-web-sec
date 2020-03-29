const path = require("path");
const { readdirSync } = require("fs");
const { exec } = require("child_process");

const exercisesDir = "src";
const startScript = "start.sh";
const [_, __, arg3] = process.argv;
const exercise = arg3.includes("/")
  ? arg3
      .split("/")
      .filter(Boolean)
      .filter(str => str !== exercisesDir)[0]
  : arg3;

if (!exercise) {
  throw new Error(
    "Pass exercise directory name as an argument (e.g. node start.js 04-cors"
  );
}

const resolveApp = (...paths) =>
  path.resolve(path.join(__dirname, "..", ...paths));

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const exercises = getDirectories(resolveApp(exercisesDir));

if (!exercises.includes(exercise)) {
  throw new Error("Invalid exercise name");
}

const startScriptPath = require.resolve(
  resolveApp(exercisesDir, exercise, startScript)
);

console.log(`Exercise ${exercise}`);
const childProcess = exec(`sh ${startScriptPath}`);
childProcess.stdout.pipe(process.stdout);

process.on("SIGINT", () => {
  childProcess.kill("SIGINT");
  process.exit();
});
