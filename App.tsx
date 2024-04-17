import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from 'react-native-paper'

import Main from './Main'

const queryClient = new QueryClient()

const App = () => {
  const theme = useTheme()
  theme.colors.secondaryContainer = 'transperent'

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

export default App
