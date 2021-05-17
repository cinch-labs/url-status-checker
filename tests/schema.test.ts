import * as path from 'path'
import * as fs from "fs";
import {isInputFileValid} from "../src/schema";
import * as yaml from 'js-yaml'

const readData = (name: string) => {
  const file = path.resolve(__dirname, 'data', name)
  return yaml.load(fs.readFileSync(file).toString())
}

test('validates a good file', () => {
  const data = readData("links.yml")
  console.log(data)

})

test('fails to validate a bad file', () => {
  const data = readData("bad.yml")
  console.log(data)
  expect(isInputFileValid(data)).toBe(false)
})
