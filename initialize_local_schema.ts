import { exec } from 'child_process'
import util from 'util';
import { performance } from 'perf_hooks';

const startTime = performance.now()

const execAsync = util.promisify(exec)

console.log(1)
let res = await execAsync('mkdir -p ../working && cd ../working && git init')
if (res.stderr) {  
    console.error(res.stderr);  
}  
console.log(res.stdout) 

console.log(2)
res = await execAsync('npm run new_branch')
if (res.stderr) {  
    console.error(res.stderr);  
}  
console.log(res.stdout) 

console.log(3)
res = await execAsync('npm run new_checkout')
if (res.stderr) {  
    console.error(res.stderr);  
}  
console.log(res.stdout) 

console.log(4)
res = await execAsync('npm run commit')
if (res.stderr) {  
    console.error(res.stderr);  
}  
console.log(res.stdout) 

console.log(5)
res = await execAsync('npm run checkout')
if (res.stderr) {  
    console.error(res.stderr);  
}  
console.log(res.stdout) 

console.log(6)
res = await execAsync('npm run merge')
if (res.stderr) {  
    console.error(res.stderr);  
}  
console.log(res.stdout) 

const endTime = performance.now()

console.log(`Total Time: ${endTime - startTime} milliseconds`)