import { createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home.tsx'
import NotFound from './routes/NotFound.tsx'
import Root from './routes/Root.tsx'
import SpotPage from './routes/SpotPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'spots/:spotId', element: <SpotPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
