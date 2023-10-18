import { QueryClient, QueryClientProvider } from 'react-query';
import '@styles/globals.css';
import StoreProvider from '@utils/store';
import { AuthProvider } from '@lib/auth';
import { AppPropsWithLayout } from '@appTypes/.';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    var _mtm = (window._mtm = window._mtm || []);
    _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src =
      'https://cdn.matomo.cloud/shopzencrmvercelapp.matomo.cloud/container_D2rFJemI.js';
    s.parentNode.insertBefore(g, s);

  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://shopzencrmvercelapp.matomo.cloud/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='//cdn.matomo.cloud/shopzencrmvercelapp.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
  })();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AuthProvider>{<Component {...pageProps} />}</AuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}
