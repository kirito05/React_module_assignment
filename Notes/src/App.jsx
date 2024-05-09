import {useState,useEffect} from 'react'
import MyContext  from './context'
import NoteSection from './components/NoteSection/notesection'
import SelectedNote from './components/SelectedNote/selectednote'


function App() {
  const [modal,setModal] = useState(false)
  const toggleModal = () => setModal((prev)=>!prev)
  const  [noteHeadings,setNoteHeadings] = useState(localStorage.getItem('notes')?JSON.parse(localStorage.getItem('notes')):[])
  const [hide, setHide] = useState(false)
  const [currentGroup,setCurrentGroup] = useState('')
  const [isMobile,setIsMobile] = useState(window.innerWidth<768)

  useEffect(()=>{
    const handelResize = ()=>{
      setIsMobile(window.innerWidth<768)
      if(window.innerWidth>=768){
        setHide(false)
      }
    }
    const handleEscape  = (e)=>{
      if(e.key==='Escape'){
        setCurrentGroup(false)
      }
    }

    window.addEventListener('resize',handelResize)
    window.addEventListener('keydown',handleEscape)

    return ()=>{
      window.removeEventListener('resize',handelResize)
      window.removeEventListener('keydown',handleEscape)
    }

  },[]);
  return (
    <MyContext.Provider
      value={{
        modal,
        toggleModal,
        noteHeadings,
        setNoteHeadings,
        hide,
        setHide,
        currentGroup,
        setCurrentGroup,
        isMobile,
        setIsMobile
      }}>
      <div className='App'>
        <NoteSection/>
        <SelectedNote/>
      </div>
    </MyContext.Provider>
  )
}

export default App