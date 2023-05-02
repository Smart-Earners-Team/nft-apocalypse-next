import Web3ReactProvider from '@/components/Web3ReactProvider'
import NetworkSelectorProvider from '@/contexts/NetworkSelector'
import AppWalletProvider from '@/contexts/AppContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ModalProvider from '@/components/Modal/ModalContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NetworkSelectorProvider>
      <Web3ReactProvider>
        <AppWalletProvider>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </AppWalletProvider>
      </Web3ReactProvider>
    </NetworkSelectorProvider>
  )
}
