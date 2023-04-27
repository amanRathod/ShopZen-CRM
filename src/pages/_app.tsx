import { QueryClient, QueryClientProvider } from 'react-query';
import '@styles/globals.css';
import StoreProvider from '@/utils/store';
import { AppPropsWithLayout } from '@appTypes/.';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </QueryClientProvider>
  );
}
