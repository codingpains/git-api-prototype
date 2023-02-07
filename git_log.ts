import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import path from 'path';

const pathToRepo = path.resolve("../aws/buckets/");

const options: Partial<SimpleGitOptions> = {
   baseDir: pathToRepo,
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

// when setting all options in a single object
const git: SimpleGit = simpleGit(options);

console.log(await git.log());