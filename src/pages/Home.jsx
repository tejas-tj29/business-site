import Hero from "../sections/Hero";
import ProductIntro from "../components/ProductIntro";
import ClientMarquee from "../components/ClientMarquee";
import IndustryVerticals from "../components/IndustryVerticals";

export default function Home() {
    return(
        <>
            <Hero />
            <ProductIntro />
            <IndustryVerticals />
            <ClientMarquee /> 
        </>
    )
}