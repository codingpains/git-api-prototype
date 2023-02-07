import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import path from 'path';
import fs from 'fs'
import { performance } from 'perf_hooks';

const pathToRepo = path.resolve("../buckets/");

const options: Partial<SimpleGitOptions> = {
   baseDir: pathToRepo,
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

fs.appendFileSync(pathToRepo+"/test.txt", '\nCool');

const git: SimpleGit = simpleGit(options);

const startTime = performance.now()

await git
   .addConfig('user.name', 'Someone')
   .addConfig('user.email', 'some@one.com')
   .add('test.txt')
   .commit('Test');

const endTime = performance.now()

console.log(`Time: ${endTime - startTime} milliseconds`)