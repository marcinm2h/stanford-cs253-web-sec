const path = require("path");
const { readdirSync } = require("fs");
const { exec } = require("child_process");

const resolveApp = (...paths) =>
  path.resolve(path.join(__dirname, "..", ...paths));

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const [_, __, arg] = process.argv;
if (!arg) {
  throw new Error(
    "Pass exercise directory name as an argument (e.g. node start.js 04-cors)"
  );
}

const exercisesDir = "src";
const startScript = "start.sh";
const exercise = arg.includes("/")
  ? arg.split("/").filter(str => str && str !== exercisesDir)[0]
  : arg;

const exercises = getDirectories(resolveApp(exercisesDir));

if (!exercises.includes(exercise)) {
  throw new Error("Invalid exercise name");
}

const startScriptPath = require.resolve(
  resolveApp(exercisesDir, exercise, startScript)
);

console.log(`Exercise ${exercise}`);

const DIR = resolveApp(exercisesDir, exercise);
const PORT = process.env.PORT;
const ENV = [`DIR="${DIR}"`, PORT && `PORT="${PORT}"`]
  .filter(Boolean)
  .join(" ");
const childProcess = exec(`${ENV} sh ${startScriptPath}`);

childProcess.stdout.pipe(process.stdout);
childProcess.stderr.pipe(process.stderr);

process.on("SIGINT", () => {
  childProcess.kill("SIGINT");
  process.exit();
});
