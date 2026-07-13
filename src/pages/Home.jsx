import Hero from "../sections/Hero";
import ProductIntro from "../components/ProductIntro";
import ClientMarquee from "../components/ClientMarquee";
import IndustryVerticals from "../components/IndustryVerticals";

import { useEffect } from 'react';

export default function Home() {

     useEffect(() => {
    document.title = "Home | Sarawagi Enterprises";
     }, []);

    return(
        <>
            <Hero />
            <ProductIntro />
            <IndustryVerticals />
            <ClientMarquee /> 
        </>
    )
}