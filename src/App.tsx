import { Box, LinearProgress, Typography } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import SearchAppBar from './components/AppBar'
import { useBaseStore } from './store/BaseStore'
import { useEffect } from 'react'
import { LoadedNoUser } from './routes/root/LoadedNoUser'
import { LoadedNoConfig } from './routes/root/LoadedNoConfig'
import { useUserStore } from './store/UserStore'
import { Login } from './routes/auth/Login'
import { SignUp } from './routes/auth/SignUp'
import { VerifyAccount } from './routes/auth/VerifyAccount'
import { CreateOrganization } from './routes/auth/CreateOrganization'
import { Employee } from './routes/employee'
import { Settings } from './routes/settings'
import { Client } from './routes/client'
import { ClientData } from './routes/client/ClientData'
import { ContactType } from './routes/client/ContactType'
import { ConfirmContactCreated } from './routes/client/ConfirmContactCreated'
import { CreateLocation } from './routes/auth/CreateLocation'
import { WaitingContacts } from './routes/employee/WaitingContacts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/client',
        element: <Client />,
        children: [
          {
            path: '/client/client-data',
            element: <ClientData />
          },
          {
            path: '/client/contact-type',
            element: <ContactType />
          },
          {
            path: '/client/contact-created',
            element: <ConfirmContactCreated />
          },
        ]
      },
      {
        path: '/create-location',
        element: <CreateLocation />
      },
      {
        path: '/create-organization',
        element: <CreateOrganization />
      },
      {
        path: '/employee',
        element: <Employee />,
        children: [
          {
            path: '/employee/waiting-contacts',
            element: <WaitingContacts />
          }
        ]
      },
      {
        path: '/loaded-no-config',
        element: <LoadedNoConfig />
      },
      {
        path: '/loaded-no-user',
        element: <LoadedNoUser />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        path: '/verify-account',
        element: <VerifyAccount />
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

  // Don't want to show nav to clients
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
              <Box sx={{ height: 2, width: '100%', paddingTop: 4 }}>
                <LinearProgress sx={{ marginLeft: 4, marginRight: 4, height: 2, borderRadius: 2 }} />
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
