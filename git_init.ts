import { simpleGit, SimpleGit } from 'simple-git'
import { performance } from 'perf_hooks'

const git: SimpleGit = simpleGit();

const startTime = performance.now()

console.log(await git.log());

try {
   await git.init();
} catch (e) {
   console.log(e)
}

const endTime = performance.now()

console.log(`Time git_init: ${endTime - startTime} milliseconds`)