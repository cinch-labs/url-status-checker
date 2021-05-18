import * as yaml from "js-yaml";
import fs from "fs";
import * as Result from './types'

export const readFile = (name: string): Result.Type<object> => {
  const ret = yaml.load(fs.readFileSync(name).toString())

  if (!ret) {
    return new Error('Unable to read file')
  }

  return ret as object
}
