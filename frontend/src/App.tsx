import { useEffect } from "react"

function App() {
  const load = async () => {
    const response = await fetch("https://localhost:5001/weatherforecast").then(
      data => data.json()
    )

    console.log(response)
  }

  useEffect(() => {
    load()
  }, [])

  return null
}

export default App

