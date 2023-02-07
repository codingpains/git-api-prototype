import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import path from 'path';
import fs from 'fs'

const pathToRepo = path.resolve("../aws/buckets/");

const options: Partial<SimpleGitOptions> = {
   baseDir: pathToRepo,
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

fs.appendFileSync(pathToRepo+"/test.txt", '\nCool');

const git: SimpleGit = simpleGit(options);

await git
   .addConfig('user.name', 'Someone')
   .addConfig('user.email', 'some@one.com')
   .add('test.txt')
   .commit('Test');