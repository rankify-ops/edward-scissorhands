import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ChairRail } from "@/components/sections/ChairRail";
import { Story } from "@/components/sections/Story";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Team } from "@/components/sections/Team";
import { Reviews } from "@/components/sections/Reviews";
import { Visit } from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ChairRail />
      <Story />
      <Services />
      <Work />
      <Reviews />
      <Team />
      <Visit />
    </>
  );
}
