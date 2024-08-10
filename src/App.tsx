import { Box, LinearProgress, Typography } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import SearchAppBar from './components/AppBar'
import { useBaseStore } from './store/BaseStore'
import { useEffect } from 'react'
import { LoadedNoUser } from './routes/root/LoadedNoUser'
import { LoadedNoConfig } from './routes/root/LoadedNoConfig'
import { useUserStore } from './store/UserStore'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/LoadedNoUser',
        element: <LoadedNoUser />
      },
      {
        path: '/LoadedNoConfig',
        element: <LoadedNoConfig />
      }
    ]
  }
])

function App() {
  const currentUser = useUserStore().currentUser
  const isLoaded = useBaseStore().isLoaded
  const doInitialLoad = useBaseStore().doInitialLoad

  useEffect(() => {
    doInitialLoad()
  }, [doInitialLoad])

  // Don't want to show nav to consignors
  const hideAppBar = !currentUser

  return (
    <>
      {
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box>
            {!hideAppBar && isLoaded ? <SearchAppBar /> : null}
          </Box>
          <Box sx={{ flex: 1 }}>
          {isLoaded &&
            <Box sx={{ height: '100%', width: '100%' }}>
              <RouterProvider router={router} />
            </Box>
          }
          {!isLoaded &&
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='h2'>Loading...</Typography>
              <Box sx={{ height: '1rem', width: '100%', paddingTop: '2rem' }}>
                <LinearProgress sx={{ marginLeft: '2rem', marginRight: '2rem', height: '1rem', borderRadius: '1rem' }} />
              </Box>
            </Box>
          }
          </Box>
        </Box>
      }
    </>
  )
}

export default App
