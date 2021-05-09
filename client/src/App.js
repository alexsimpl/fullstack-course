import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/Auth.contex'
import { Navbar } from './components/Navbar'
import 'materialize-css'

function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token                     //приведение к boolean
  const routes = useRoutes(isAuthenticated)
  
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
    <Router>
      { isAuthenticated && <Navbar />}        {/*если аутентификация есть, то показываем навбар */}
      <div className="container">
        {routes}
      </div>
    </Router>
    </AuthContext.Provider>
  )
}

export default App