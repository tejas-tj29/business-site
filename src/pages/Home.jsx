import Hero from "../sections/Hero";
import { Helmet } from "react-helmet-async";
import ProductIntro from "../components/ProductIntro";
import ClientMarquee from "../components/ClientMarquee";
import IndustryVerticals from "../components/IndustryVerticals";
import FounderMessage from "../components/FounderMessage";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Sarawagi Enterprises | Top Industrial Distributor in Jamshedpur
        </title>
        <meta
          name="description"
          content="Authorized distributors for top principle companies. Supplying premium industrial materials."
        />
        {/* Keywords help search engines understand the exact terms */}
        <meta
          name="keywords"
          content="Industrial suppliers, chemicals, [Principle Company Name] distributor, wholesale materials"
        />
      </Helmet>
      <Hero />
      <ProductIntro />
      <FounderMessage />
      <IndustryVerticals />
      <ClientMarquee />
    </>
  );
}
