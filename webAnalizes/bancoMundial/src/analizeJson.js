const getConcept = require("./getConcept")
const fs = require('fs')

/**
 * 
 * @param {Object} records 
 */
const analizeJson = (records)=>{
    const dataByConcept = {
        Social: new Map(),
        Medioambiente: new Map(),
        Economia: new Map(),
        Educacion: new Map(),
        "./": new Map()
    } 
    let testLimit = Infinity
    for(const record of records){
        const description = record.field[1]._text
        const time = record.field[2]._text
        const value = record.field[3]._text 
        
        const conceptName = getConcept(description)
        const concept = dataByConcept[conceptName]

        if(!concept.has(description)) concept.set(description,[])
        const data = concept.get(description)
        data.push(dataFormat({time,value}))
        if(testLimit === 0) break
        --testLimit
    }
    generateFileDescriptions(dataByConcept)
    return dataByConcept
}

const dataFormat = ({time,value})=>{
    return {time: `${time}-01-01`,value: parseInt(value ?? "0")}
}

const generateFileDescriptions = (dataByConcept)=>{
    Object.keys(dataByConcept).forEach(concept=>{
        const fileDirrection = `../frontend/src/views/${concept}/topics.js`
        const data = `// NOT EDIT THIS FILE IS AUTO GENERATE\n export const topics = ${JSON.stringify(Array.from(dataByConcept[concept].keys()))}`
        fs.writeFile(fileDirrection,data,()=> {})
    })
}

module.exports = analizeJson