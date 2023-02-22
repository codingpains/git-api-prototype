const diff3Merge =  require('diff3')

const first = "<<<<<<< YOUR CHANGES:version.json"
const second = "======="
const third = ">>>>>>> THEIR CHANGES:main.json"

function merge(version, commonAncestor, main) {
    return diff3Merge(version, commonAncestor, main)
}

function addMarkers(diff) {
    let res = []
    let conflict = false
    diff.forEach(element => {
        if (element.hasOwnProperty("ok")) {
            res.push(...element["ok"])
        }
        else {
            conflict = true
            res.push(first)
            element["conflict"]["a"].forEach(i => {
                res.push(i)
            })
            res.push(second)
            element["conflict"]["b"].forEach(i => {
                res.push(i)
            })
            res.push(third)
        }
    })
    return conflict ? {"conflicts": res} : {"output": res}
}

module.exports = {merge, addMarkers}

// function getArrayOfStringFromFile(file) {
//     const readLines = new ReadLines(file)
//     let line
//     let res = []
//     while ((line = readLines.next())) {
//         res.push(line.toString('ascii'))
//     }
//     return res
// }

// const version = getArrayOfStringFromFile('./version.json')
// const ancestor = getArrayOfStringFromFile('./ancestor.json')
// const main = getArrayOfStringFromFile('./main.json')