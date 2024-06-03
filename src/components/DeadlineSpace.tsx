import React from 'react'
import { useState } from 'react'
import { db } from '../models/db'
import milliSecEdit from '../functions/milliSecEdit'
// import millisecondsTest from '../functions/millisecondsTest'
import { useLiveQuery } from 'dexie-react-hooks'
import { Deadline } from '../models/Deadline'


const { deadline } = db

const DeadlineSpace = () => {
  // もしかしたら必要の無いstateがあるかも
  // id は自動でインクリメント
  const [name, setName] = useState<string>("")
  // ミリ秒二つ↓も一応文字列で型付け
  // 期限のミリ秒
  const [deadlineSec, setDeadlineSec] = useState<string>("")
  // スタート時のミリ秒(このstateは必要無いかも)
  // const [startSec, setStartSec] = useState<string>("")
  // 期限を達成したか否か
  const [achievement, setAchievement] = useState<boolean>(false)
  // 達成・未達成に関わらずカウントを終えたかどうか
  const [finished, setFinished] = useState<boolean>(false)

  const nameHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const deadlineHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadlineSec(e.target.value)
  }

  const addDeadline = async (e: React.FormEvent<HTMLFormElement>) => {
    // デフォルトのリロードを防ぐ(？)
    e.preventDefault()
    
    // スタート時のミリ秒のした三桁を000にする
    const startMilli: number = milliSecEdit(Date.now())
    // setStateが効かない
    // setStartSec(String(tmpStart))
    console.log(startMilli)
    console.log(e)
    // console.log("startSec, ", startSec)
    console.log(name, (Number(deadlineSec)*60000 + startMilli), startMilli, achievement, finished)
    await deadline.add({
      name: name,
      deadline: (Number(deadlineSec)*60000 + startMilli),
      startSec: startMilli,
      achievement: achievement,
      finished: finished,
    })
    setName('')
    setDeadlineSec('')
    // setStartSec('')

    alert("カウント開始")
  }

  const allItems: Array<Deadline> | any = useLiveQuery(() => deadline.toArray(), [])
  const testSearch: Array<Deadline> | any  = allItems?.filter((item: Deadline | any) => item.finished === false)
  console.log(testSearch)
  console.log("name=", testSearch[0].name)
  console.log("startSec=",  new Date(testSearch[0].startSec))
  console.log("deadline=",  new Date(testSearch[0].deadline))
  return (
    <div>
      <p>Deadline</p>
      <div>
        <form onSubmit={(e) => addDeadline(e)}>
        {/* ↑は本番 */}
        {/* <form onSubmit={addDeadline}> */}
          <label>何を我慢する？</label>
          <input type="text" value={name} onChange={nameHandleChange} required />
          {/* 期限は短いのから試していくこと */}
          {/* <label>何日我慢する？*86400000</label> */}
          {/* <label>何時間我慢する？*3600000</label> */}
          <label>何分我慢する？*60000</label>
          <input type="text" value={deadlineSec} onChange={deadlineHandleChange} />
          <button type='submit'>
            登録
          </button>
        </form>
      </div>
      {/* <div>
        <h2>setIntervalテスト {millisecondsTest(time)}</h2>
      </div> */}
    </div>
  )
}

export default DeadlineSpace