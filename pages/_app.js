import '../styles/globals.css'
import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const bscChain = {
  id: 56,
  name: 'Smart Chain',
  network: 'Smart Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Binace Smart Chain',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org/',
  },
  blockExplorers: {
    default: { name: 'BSCScan', url: 'https://bscscan.com' },
  },
  testnet: false,
}


const { chains, provider, webSocketProvider } = configureChains(
  [bscChain, chain.mainnet],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors:[
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true
      }
    })
  ],
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
