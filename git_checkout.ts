import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import path from 'path';

const pathToRepo = path.resolve("../unbiased-watch/");

const options: Partial<SimpleGitOptions> = {
   baseDir: pathToRepo,
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

const git: SimpleGit = simpleGit(options);

const r = await git.checkoutBranch("new_branch_test", "main")

console.log(r)