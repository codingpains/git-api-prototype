import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import path from 'path';
import { performance } from 'perf_hooks';
import { exec } from 'child_process'
import util from 'util';

const execAsync = util.promisify(exec)

const pathToRepo = path.resolve("../working/");

const options: Partial<SimpleGitOptions> = {
   baseDir: pathToRepo,
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

const git: SimpleGit = simpleGit(options);

const startTime = performance.now()

const r = await git.branch(["-M", "main"])

console.log(r)

let res = await execAsync('cd ../working && aws s3api get-object --bucket git-api-prototype --key main/schema.txt schema.txt  && git add . && git commit -m "Upload File"')
if (res.stderr) {  
   console.error(res.stderr);  
}  
console.log(res.stdout) 

const endTime = performance.now()

console.log(`Time: ${endTime - startTime} milliseconds`)