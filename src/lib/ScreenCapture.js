import path from 'path'
import moment from 'moment'
import config from 'config'
const phantom = global.require('phantom')

export default class{

  constructor(){
    this.datetime = new Date()
    this.directory = moment(this.datetime).format('YYYYMMDD_HHmmss')
  }

  async take(url){
    const page = await this._getPage()
    const status = await page.open(url)
    const success = status === 'success'
    if(success === false){
      return {status, success}
    }
    const title = await page.property('title')
    const name = title + '.png'
    const filePath = path.join(config.logDirectory, this.directory, name)
    await page.render(filePath)
    return {status, success, name}
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
