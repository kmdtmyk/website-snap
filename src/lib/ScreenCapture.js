import path from 'path'
import moment from 'moment'
const phantom = global.require('phantom')

export default class{

  constructor(){
    this.datetime = new Date()
    const now = moment(this.datetime).format('YYYYMMDD_HHmmss')
    this.directory = path.join('screenshot', now)
  }

  async take(url){
    const page = await this._getPage()
    const status = await page.open(url)
    const title = await page.property('title')
    const filename = title + '.png'
    const filePath = path.join(this.directory, filename)
    await page.render(filePath)
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
