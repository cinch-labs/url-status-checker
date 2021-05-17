import {readFile} from "./lib/file";
import {isInputFileValid, Link, LinksFile} from "./lib/schema";
import * as core from '@actions/core'
import * as github from '@actions/github'
import * as Result from './lib/types'
import {checkAllLinks} from "./lib/link";

async function run() {
  try {
    const file = core.getInput('file')
    console.log(`Reading links file at: ${file}`)

    if(!file) {
      const logMsg = "The 'file' input parameter was not provided"
      core.setFailed(logMsg)
      return
    }

    const data = readFile(file)

    if(Result.isError(data)) {
      core.setFailed(`Couldn't read file: ${data.message}`)
      return
    }

    if(!isInputFileValid(data)) {
      core.setFailed("Input file was not valid")
      return
    }

    const linksData: LinksFile = data as LinksFile

    const results = await checkAllLinks(linksData.links)

    for(const result of results) {
      if(result.success) {
        core.info(`PASS - ${result.url}`)
      } else {
        core.info(`FAIL - ${result.url}`)
      }
    }


  } catch(e) {
    core.setFailed(e.message)
  }
}

run()
