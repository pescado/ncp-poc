import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Layout from '../components/layout';
import '../styles/global.scss';

const swrGlobalOptions = {
  revalidateOnMount: false,
  revalidateOnFocus: false,
  // revalidateIfStale: true,
};

console.log('Global SWR options:');
console.log(swrGlobalOptions);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={swrGlobalOptions}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
