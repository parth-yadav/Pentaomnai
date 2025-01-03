import { HomeBlogPeek } from "@/components/home/blogpeek";
import { HomeEvents } from "@/components/home/events";
import { HomeGetInvolved } from "@/components/home/getInvolved";
import { HomeHero } from "@/components/home/hero";
import { HomePartners } from "@/components/home/partners";
import { HomePromotions } from "@/components/home/promotion";
import { HomeWho } from "@/components/home/who";
import StatsDisplay from "./home/stats";

import ParPage from "./home/parevents/parpage";
import Whatsapp from "./home/whatsapp-widget";
import ScrollToTopButton from "./home/scrollup";

export default function LandingPage() {
    return (
        <div className='flex min-h-screen flex-col'>
            <main className='flex min-h-screen flex-1 flex-col'>
                <ScrollToTopButton />                
                <HomeHero />
                 <StatsDisplay />
                <HomeWho />
               
              <HomeEvents />
                <ParPage />
                <HomePromotions />
                <HomePartners />
               
                <HomeGetInvolved />
            </main>
        </div>
    );
}
