import React, {useState, useContext, useRef, useEffect} from 'react'
import {LangContext, AuthContext} from '../../middleware/context'

import Big from './big'
import Small from './small'

export default props => {
  const [opened, setOpen] = useState('closed')
  const open = () => setOpen('opened')
  const close = () => setOpen('closed')

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  const lang = useContext(LangContext)
  const user = useContext(AuthContext)
  const isAuthed = user._id !== undefined

  return (
    <header className="app flex items-center justify-between p-3">

      {/* Large viewport (>1024px) */}
      <Big isAuthed={isAuthed} lang={lang} myref={ref} isComponentVisible={isComponentVisible}
           setIsComponentVisible={setIsComponentVisible} changeLang={props.changeLang}/>

      {/* Small viewport (<1024px) */}
      <Small isAuthed={isAuthed} lang={lang} opened={opened}
             open={open} close={close} changeLang={props.changeLang}/>

    </header>
  )
}

const useComponentVisible = (initialIsVisible) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return { ref, isComponentVisible, setIsComponentVisible }
}
