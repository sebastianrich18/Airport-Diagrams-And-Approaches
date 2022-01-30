const fs = require('fs')
const http = require('http')
const terminalProcedures = require('terminal-procedures')
const { DownloaderHelper } = require('node-downloader-helper');

const OUTPUT_FOLDER = ".\\output"

const filters = {
  accept: ["IAP", "APD"] // can be MIN, HOT, AHS, STAR, IAP, APD, DP
}

let codes = JSON.parse(fs.readFileSync("./codes.json"))

for (let code of codes) {
  const folderPath = OUTPUT_FOLDER + "\\" + code
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  } else if (fs.readdirSync(folderPath).length !== 0) { // if that dir has conents, we already have the data for that code
    continue
  }
  terminalProcedures.list(code).then(res => {
    // console.log('Got', code + ":")
    for (let obj of res) {
      let type = obj.type
      let url = obj.procedure.url
      let name = obj.procedure.name.split(" ").filter(x => !x.includes("(") && !x.includes(")")).join("_").replace("/", "-")
      let filePath = folderPath + "\\" + name + ".pdf"
      // console.log(filePath, code, name)

      if (filters.accept.includes(type) && !fs.existsSync(filePath)) {
        const download = new DownloaderHelper(url, folderPath, {fileName: name + ".pdf"});
        download.on('end', () => console.log("Downloaded", code, name))
        download.start();
      }
    }
  })
}
