import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MainPage } from './MainPage.jsx'
import './Styles/defaultStyles.css'

createRoot(document.getElementById('root')).render(
  
  // Strict mode prevents fetches from working since it mounts and unmounts the component so if doing anything involving fetches remove the StrictMode tags.
  <MainPage />
  // <StrictMode>
  //   <MainPage />
  // </StrictMode>,
)
