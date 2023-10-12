import createEmotionCache from '@/mui-config/createEmotionCache';
import '@/styles/globals.css'
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app'
import theme from '@/mui-config/theme'
import Head from 'next/head';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache()

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {

  return (
    <CacheProvider value={emotionCache}>
      <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  )
}
