import React, { useState } from "react"

export default function Home() {
  const [str, setStr] = useState(0)
  const [end, setEnd] = useState(0)
  const [mining, setMining] = useState(0)
  const [profession, setProfession] = useState('mining')
  const [balance, setBalance] = useState('1000')
  
  /* taken from DFK UI */
  const calculateMaxJEWELUnlockRate = () => {
    const minLocked = 20000
    const base = 0.25
    const sRate = 0.000625
    const mRate = 0.0025
    const heroProfession = profession
    const hasMatchingProficiencyType = heroProfession === 'mining'
    const geneBonus = hasMatchingProficiencyType ? 1 : 0
    const minLockedRatio = hasMatchingProficiencyType ? 833.33 : 1000
    const STR = parseInt(str)
    const END = parseInt(end)
    const minSkl = Math.floor(parseFloat(mining))
    const lockedJEWEL = Number(balance)
    const lockedRatio =
      lockedJEWEL > minLocked ? 1000 - 166 * geneBonus : ((1000 - 166 * geneBonus) * minLocked) / lockedJEWEL
    const cappedLockedRatio = lockedRatio < minLockedRatio ? minLockedRatio : lockedRatio
    const unlockRate = (1000 * (base + (STR + END) * sRate + minSkl * mRate)) / cappedLockedRatio
  
    return unlockRate
  }

  const handleStr = e => setStr(e.target.value)
  const handleEnd = e => setEnd(e.target.value)
  const handleMining = e => setMining(e.target.value)
  const handleProfession = e => setProfession(e.target.value)
  const handleBalance = e => setBalance(e.target.value)

  return (
    <div>
      <h1>DFK lead miner unlock rate</h1>
      <form>
        <div>
          <label>STR</label>
          <input type="text" value={str} onChange={handleStr} placeholder="STR"></input>
        </div>
        <div>
          <label>END</label>
          <input type="text" value={end} onChange={handleEnd} placeholder="END"></input>
        </div>
        <div>
          <label>Mining</label>
          <input type="text" value={mining} onChange={handleMining} placeholder="Mining"></input>
        </div>
        <div>
          <label>Profession</label>
          <select onChange={handleProfession}>
            {['fishing', 'foraging', 'gardening', 'mining'].map(p => <option key={p} selected={profession === p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label>Locked JEWEL</label>
          <input type="text" value={balance} onChange={handleBalance} placeholder="Locked JEWEL"></input>
        </div>
      </form>
      
      <br/>
      <br/>

      Max JEWEL unlock rate: {calculateMaxJEWELUnlockRate()} JEWEL per tick 
    </div>
  )
}
