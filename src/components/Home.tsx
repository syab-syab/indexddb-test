import React from 'react'

const Home = () => {
  let dbName: string = 'sampleDB'

  let openReq: any = indexedDB.open(dbName);
  //　DB名を指定して接続。DBがなければ新規作成される。

  openReq.onupgradeneeded = (event: any) => {
    //onupgradeneededは、DBのバージョン更新(DBの新規作成も含む)時のみ実行
    console.log('db upgrade')
  }

  openReq.onsuccess = (event: any) => {
    console.log('db open success')
    let db: any = event.target.result;
    // 接続を解除する
    db.close()
  }

  openReq.onerror = (event: any) => {
    console.log('db open error');
  }


  // データベース削除

  // var deleteReq = indexedDB.deleteDatabase(dbName);

  // deleteReq.onsuccess = function(event){
  //   console.log('db delete success');
  //   存在しないDB名を指定してもこっちが実行される
  // }

  // deleteReq.onerror = function(){
  //   console.log('db delete error');
  // }


  // オブジェクトストア(テーブル)作成
  let storeName: string = 'sampleStore';

  let currentDateTime: any = new Date()

  let dbVersion: number = currentDateTime.getTime()

  let openReqSecond: any = indexedDB.open(dbName, dbVersion)
  // オブジェクトストアの作成・削除はDBの更新時しかできないので、バージョンを指定して更新

  openReqSecond.onupgradeneeded = (event: any) => {
    let db: any = event.target.result;
    db.createObjectStore(storeName, {keyPath : 'id'})
  }


  return (
    <>
      <div>
        <h1>IndexedDBのテスト</h1>
      </div>
    </>
  )
}

export default Home