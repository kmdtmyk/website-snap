const { app, BrowserWindow, protocol } = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
const url = require('url')

// メインウィンドウ
let mainWindow


//  初期化が完了した時の処理
app.on('ready', function(){

  const windowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 768,
  })
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow(windowState)

  windowState.manage(mainWindow)

  // メインウィンドウに表示するURLを指定します
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // デベロッパーツールの起動
  mainWindow.webContents.openDevTools()

  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', function(){
    mainWindow = null
  })

})

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', function(){
  // macOSのとき以外はアプリケーションを終了させます
  if(process.platform !== 'darwin'){
    app.quit()
  }
})

// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', function(){
  /// メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if(mainWindow === null){
    createWindow()
  }
})
