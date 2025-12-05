import './App.css'
import { BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom'
import PollList from './components/admin/PollList'
import PollForm from './components/admin/PollForm'
import PollDetail from './components/admin/PollDetail'
import PublicPoll from './components/public/PublicPoll'
import Poll from './components/Poll'

function App() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col items-center justify-center p-6 rounded-[30px]">
      <h1 className='text-white font-bold text-5xl mb-4'>Les sondages</h1>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <button onClick={()=>navigate('/admin')}
          className=' bg-black text-white px-4 py-2 rounded-[10px]'
        >Accueil</button>
        <button onClick={()=>navigate('/a')}
          className=' bg-black text-white px-4 py-2 rounded-[10px]'
          >AccueilV2</button>
      </div>
      <Routes>
        {/* Admin */}
        <Route path='/admin' element={<PollList/>}/>
        <Route path='/admin/create' element={<PollForm/>}/>
        <Route path='/admin/:id' element={<PollDetail/>}/>
        <Route path='/admin/edit/:id' element={<PollForm/>}/>

        {/* Public */}
        <Route path='/' element={<PublicPoll/>}/>
        <Route path='/a' element={<Poll/>}/>

        {/* Route fallback optionnelle */}
        <Route path="*" element={<div className="p-6">Page introuvable</div>} />
      </Routes>
    </div>
  )
}
export default App