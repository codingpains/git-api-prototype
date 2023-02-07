import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import path from 'path';
import { performance } from 'perf_hooks';

const pathToRepo = path.resolve("../../buckets/");

const options: Partial<SimpleGitOptions> = {
   baseDir: pathToRepo,
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

const git: SimpleGit = simpleGit(options);

const startTime = performance.now()

const r = await git.checkoutBranch("new_branch_test", "main")

console.log(r)

const endTime = performance.now()

console.log(`Time: ${endTime - startTime} milliseconds`)