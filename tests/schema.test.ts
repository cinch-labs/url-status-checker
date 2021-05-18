import {isInputFileValid} from "../src/schema";
import {readFile} from '../src/file'

test('validates a good file', () => {
  const data = readFile("./tests/data/links.yml")
  console.log(data)
  expect(isInputFileValid(data)).toBe(true)
})

test('fails to validate a bad file', () => {
  const data = readFile("./tests/data/bad.yml")
  console.log(data)
  expect(isInputFileValid(data)).toBe(false)
})
