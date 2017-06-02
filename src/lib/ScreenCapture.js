import path from 'path'
const phantom = global.require('phantom')

const logDirectory = 'screenshot'

export default class{

  async take(url){
    const page = await this._getPage()
    const status = await page.open(url)
    const title = await page.property('title')
    const filename = path.join(logDirectory, title + '.png')
    await page.render(filename)
    const filePath = path.join(global.process.cwd(), filename)
    return {status, filePath}
  }

  async _getInstance(){
    if(!this._instance){
      this._instance = await phantom.create()
    }
    return this._instance
  }

  async _getPage(){
    const instance = await this._getInstance()
    if(!this._page){
      this._page = await instance.createPage()
    }
    return this._page
  }

}
