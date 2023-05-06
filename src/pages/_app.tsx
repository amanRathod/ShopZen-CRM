import { QueryClient, QueryClientProvider } from 'react-query';
import '@styles/globals.css';
import StoreProvider from '@utils/store';
import { AuthProvider } from '@lib/auth';
import { AppPropsWithLayout } from '@appTypes/.';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AuthProvider>{<Component {...pageProps} />}</AuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}
