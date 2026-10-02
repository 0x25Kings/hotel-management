import { useEffect, useState } from 'react'
export default function useAsync(fn, deps = []) {
  const [data, setData] = useState(null)
  const reload = () => fn().then(setData)
  useEffect(() => { reload() }, deps)
  return [data, reload]
}
