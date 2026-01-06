import './App.css'
import { BrowserRouter as Router,Routes,Route, } from 'react-router-dom'
import PollList from './components/admin/PollList'
import PollForm from './components/admin/PollForm'
import PollDetail from './components/admin/PollDetail'
import Poll from './components/public/Poll'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import AdminLayout from './components/layout/AdminLayout'
import UserLayout from './components/layout/UserLayout'
import UserList from './components/admin/UserList'
import UserForm from './components/admin/UserForm'
import Profil from './pages/Profil'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col items-center justify-center p-6 rounded-[30px]">
      <h1 className='text-white font-bold text-5xl mb-4'>Les sondages</h1>
      
      <Routes>
        {/* Login */}
        <Route path='/connexion' element={<Login/>}/>
        
        {/* BOSS */}
        <Route path='/admin/users/create' element={<PrivateRoute role="BOSS"><AdminLayout><UserForm/></AdminLayout></PrivateRoute>}/>
        <Route path='/admin/users/allUSers' element={<PrivateRoute role="BOSS"><AdminLayout><UserList/></AdminLayout></PrivateRoute>}/>
        <Route path='/admin/users/edit/:id' element={<PrivateRoute role="BOSS"><AdminLayout><UserForm/></AdminLayout></PrivateRoute>}/>
        <Route path='/admin/users/profil/:id' element={<PrivateRoute role="BOSS"><AdminLayout><Profil/></AdminLayout></PrivateRoute>}/>

        {/* BOSS et Admin */}
        <Route path='/admin' element={<PrivateRoute role={["BOSS","ADMIN"]}><AdminLayout><PollList/></AdminLayout></PrivateRoute>}/>
        <Route path='/admin/create' element={<PrivateRoute role={["BOSS","ADMIN"]}><AdminLayout><PollForm/></AdminLayout></PrivateRoute>}/>
        <Route path='/admin/:id' element={<PrivateRoute role={["BOSS","ADMIN"]}><AdminLayout><PollDetail/></AdminLayout></PrivateRoute>}/>
        <Route path='/admin/edit/:id' element={<PrivateRoute role={["BOSS","ADMIN"]}><AdminLayout><PollForm/></AdminLayout></PrivateRoute>}/>
        <Route path='/accueil' element={<PrivateRoute role={["BOSS","ADMIN"]}><AdminLayout><Poll/></AdminLayout></PrivateRoute>}/>

        {/* Admin */}
        <Route path='/profil' element={<PrivateRoute role="ADMIN"><AdminLayout><Profil/></AdminLayout></PrivateRoute>}/>
 
        {/* Public */}
        <Route path='/' element={<PrivateRoute role="USER"><UserLayout><Poll/></UserLayout></PrivateRoute>}/>
        <Route path='/monProfil' element={<PrivateRoute role="USER"><UserLayout><Profil/></UserLayout></PrivateRoute>}/>
        
        {/* Route fallback optionnelle */}
        <Route path="*" element={<div className="p-6">Page introuvable</div>} />
      </Routes>
    </div>
  )
}
export default App