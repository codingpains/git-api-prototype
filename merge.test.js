const {describe, expect, test} = require('@jest/globals');
const { merge } = require('./merge')
const fs = require('fs')

describe("merge", ()=>{
    test("returns an object", ()=>{
        const { version, main, commonAncestor } = getFiles()
        const res = merge(version, commonAncestor, main)
        expect(res).toBeInstanceOf(Object)
        expect(res).not.toBeInstanceOf(Array)
    })
    test("contains conflict key", ()=>{
        const { version, main, commonAncestor } = getFiles()
        const res = merge(version, commonAncestor, main)
        expect(res).toHaveProperty("conflicts")
        expect(Object.keys(res)).toHaveLength(1)
    })
    test("insert opening marker", ()=>{
        const { version, main, commonAncestor } = getFiles()
        merge(version, commonAncestor, main)
    })
})

function getFiles() {
    let version = fs.readFileSync('./version.json', 'utf8').split("\n")
    let main = fs.readFileSync('./main.json', 'utf8').split("\n")
    let commonAncestor = fs.readFileSync('./ancestor.json', 'utf8').split("\n")
    return { version, main, commonAncestor }
}