import Papa from "papaparse"
import { useEffect, useMemo, useState } from "react"

const useGoogleSheet = (sheetUrl: string) => {
  const [data, setData] = useState({})
  const dataArr = useMemo(() => Array.from(data as any), [data])

  useEffect(() => {
    Papa.parse(sheetUrl, {
      download: true,
      header: true,
      complete: (r) => setData(r.data),
    })
  }, [sheetUrl])

  return dataArr
}

export default useGoogleSheet
