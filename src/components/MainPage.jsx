import {useState, useEffect} from 'react'
import desktopDarkImage from '../assets/images/bg-desktop-dark.jpg'
import desktopLightImage from '../assets/images/bg-desktop-light.jpg'
import mobileDarkImage from '../assets/images/bg-mobile-dark.jpg'
import mobileLightImage from '../assets/images/bg-mobile-light.jpg'
import TodoMain from './TodoMain'
const MainPage = () => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      });
    
      useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
      }, [theme]);
    
      const handleThemeSwitch = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
      };
    
      const backgroundImage = (theme==='dark')
      ? window.innerWidth < 768 
        ?mobileDarkImage
        :desktopDarkImage
      : window.innerWidth < 768
      ?mobileLightImage
      :desktopLightImage ;

  return (
    <div className='w-full min-h-screen dark:bg-[#181824] font-josefin'>
      <img src={backgroundImage} alt='backgroundImage' className='w-full '/>
      <TodoMain handleThemeSwitch={handleThemeSwitch} theme={theme}/>
    </div>
  )
}

export default MainPage