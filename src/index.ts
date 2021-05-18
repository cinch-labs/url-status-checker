import {readFile} from "./file";
import {isInputFileValid, LinksFile} from "./schema";
import * as core from '@actions/core'
import * as Result from './types'
import {checkAllLinks} from "./link";

async function run() {
  try {
    const file = core.getInput('file')
    core.info(`Reading links file at: ${file}`)

    if (!file) {
      const logMsg = "The 'file' input parameter was not provided"
      core.setFailed(logMsg)
      return
    }

    const data = readFile(file)

    if (Result.isError(data)) {
      core.setFailed(`Couldn't read file: ${data.message}`)
      return
    }

    if (!isInputFileValid(data)) {
      core.setFailed("Input file was not valid")
      return
    }

    const linksData: LinksFile = data as LinksFile

    const results = await checkAllLinks(linksData)

    for (const result of results) {
      if (result.success) {
        core.info(`PASS: ${result.method} ${result.url} - ${result.statusCode}`)
      } else {
        core.info(`FAIL: ${result.method} ${result.url} - Expected ${result.statusCode}, got: ${result.responseStatusCode}`)
      }
    }
  } catch (e) {
    core.setFailed(e.message)
  }
}

run()
