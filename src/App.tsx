import { Box, Container } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import SearchAppBar from './components/AppBar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  }
])

function App() {
  const path = location.pathname

  // Don't want to show nav to consignors
  const hideAppBar = path === '/consignor'

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {!hideAppBar ? <SearchAppBar /> : null}
      <Container>
        <Box sx={{ height: '100%', width: '100%' }}>
          <RouterProvider router={router} />
        </Box>
      </Container>
    </Box>
  )
}

export default App
