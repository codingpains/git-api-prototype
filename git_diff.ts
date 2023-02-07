import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import path from 'path';

const pathToRepo = path.resolve("../unbiased-watch");

const options: Partial<SimpleGitOptions> = {
   baseDir: pathToRepo,
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

const git: SimpleGit = simpleGit(options);

console.log(await git.diff(["main..test"]))