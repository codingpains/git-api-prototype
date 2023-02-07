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

const mergeSummary = await git.merge(["new_branch_test"]).catch((err) => {
    if (err.git) {
       return err.git;
    }
    throw err; 
 });
 
 if (mergeSummary.failed) {
    console.error(`Merge resulted in ${mergeSummary.conflicts.length} conflicts`);
 }
 else {
    console.log(mergeSummary)
 }

const endTime = performance.now()

console.log(`Time: ${endTime - startTime} milliseconds`)