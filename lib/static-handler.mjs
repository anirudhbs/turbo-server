import fs from 'fs'
import util from 'util'
import path from 'path'
import mime from 'mime-types'

const readFile = util.promisify(fs.readFile)
const DIRNAME = process.cwd()

export default async function () {
  let filePath = path.join(DIRNAME, 'public', this.url)
  if (filePath.endsWith('/')) {
    filePath += 'index.html'
  }
  try {
    let content = await readFile(filePath)
    this.res.statusCode = 200
    this.res.setHeader('Content-Length', content.byteLength)
    this.res.setHeader('Content-Type', mime.lookup(filePath))
    this.res.write(content)
  } catch (e) {
    this.next()
  }
}
