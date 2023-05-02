import * as React from 'react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri';

export const ThemeSwitch = () => {
  const [colorMode, setColorMode] = React.useState(false);
  const toggleColorMode = ()=>setColorMode(prev =>!prev)

  return (
    <button onClick={toggleColorMode} className='text-2xl opacity-75'>
      {colorMode ? <RiMoonFill className=''/> : <RiSunFill className=''/>}
    </button>
  )
}
