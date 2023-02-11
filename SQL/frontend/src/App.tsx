import "./App.css"
import { useRoutes } from "react-router"
import Routes from "./routes"
import { Suspense } from "react"

function App() {
  const routes = useRoutes(Routes)
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
       {routes}
      </Suspense>
    </>
  )
}

export default App
