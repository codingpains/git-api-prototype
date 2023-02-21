import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import path from 'path';
import { performance } from 'perf_hooks';
import { exec } from 'child_process'
import util from 'util';

const execAsync = util.promisify(exec)

// const pathToRepo = path.resolve("../../buckets/");
const pathToRepo = path.resolve("../working/");

const options: Partial<SimpleGitOptions> = {
   baseDir: pathToRepo,
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

const git: SimpleGit = simpleGit(options);

const startTime = performance.now()

const mergeSummary = await git.merge(["v1"]).catch((err) => {
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
   let res = await execAsync('aws s3 sync --acl public-read ../working s3://git-api-prototype/main')
   if (res.stderr) {  
      console.error(res.stderr);  
  }  
  console.log(res.stdout) 
 }

const endTime = performance.now()

console.log(`Time: ${endTime - startTime} milliseconds`)