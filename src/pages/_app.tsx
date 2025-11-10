import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import layoutData from "@/data/layout.json";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout name={layoutData.name} socialLinks={layoutData.socialLinks}>
      <Component {...pageProps} />
    </Layout>
  );
}
