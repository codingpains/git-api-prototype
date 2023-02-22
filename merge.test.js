const {describe, expect, test} = require('@jest/globals');
const { merge, addMarkers } = require('./merge')
const fs = require('fs')

describe("merge", ()=>{
    test("returns an object", ()=>{
        const { version, main, commonAncestor } = getFiles()
        const res = merge(version, commonAncestor, main)
        expect(res).toBeInstanceOf(Object)
        //expect(res).not.toBeInstanceOf(Array)
    })
    test("not null", ()=>{
        const { version, main, commonAncestor } = getFiles()
        const res = merge(version, commonAncestor, main)
        expect(Object.keys(res)).not.toHaveLength(1)
    })
})

describe("add markers", ()=>{
    test("returns an object", ()=>{
        const { version, main, commonAncestor } = getFiles()
        const diff = merge(version, commonAncestor, main)
        const res = addMarkers(diff)
        expect(res).toBeInstanceOf(Object)
    })

    test("add one marker", ()=>{
        const { version, main, commonAncestor } = getFiles()
        const diff = merge(version, commonAncestor, main)
        const res = addMarkers(diff)
        const expected = JSON.parse(fs.readFileSync('./marker.json', 'utf8'))
        expect(res).toHaveProperty("conflicts")
        expect(res).toEqual(expected)
    })

    test("no marker", ()=>{
        const { version, main, commonAncestor } = getFiles1()
        const diff = merge(version, commonAncestor, main)
        const res = addMarkers(diff)
        expect(res).toHaveProperty("output")
        const expected = JSON.parse(fs.readFileSync('./marker-1.json', 'utf8'))
        expect(res).toEqual(expected)
    })

    test("add two marker", ()=>{
        const { version, main, commonAncestor } = getFiles2()
        const diff = merge(version, commonAncestor, main)
        const res = addMarkers(diff)
        expect(res).toHaveProperty("conflicts")
        const expected = JSON.parse(fs.readFileSync('./marker-2.json', 'utf8'))
        expect(res).toEqual(expected)
    })
})

function getFiles() {
    let version = fs.readFileSync('./version.json', 'utf8').split("\n")
    let main = fs.readFileSync('./main.json', 'utf8').split("\n")
    let commonAncestor = fs.readFileSync('./ancestor.json', 'utf8').split("\n")
    return { version, main, commonAncestor }
}

function getFiles1() {
    let version = fs.readFileSync('./version-1.json', 'utf8').split("\n")
    let main = fs.readFileSync('./main-1.json', 'utf8').split("\n")
    let commonAncestor = fs.readFileSync('./ancestor-1.json', 'utf8').split("\n")
    return { version, main, commonAncestor }
}

function getFiles2() {
    let version = fs.readFileSync('./version-2.json', 'utf8').split("\n")
    let main = fs.readFileSync('./main-2.json', 'utf8').split("\n")
    let commonAncestor = fs.readFileSync('./ancestor-2.json', 'utf8').split("\n")
    return { version, main, commonAncestor }
}