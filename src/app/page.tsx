import { SiteHeader } from "@/components/marketing/site-header";
import { Hero } from "@/components/marketing/hero";
import { WhyGsd } from "@/components/marketing/why-gsd";
import { WhoItsFor } from "@/components/marketing/who-its-for";
import { Packages } from "@/components/marketing/packages";
import { PackageRecommender } from "@/components/marketing/package-recommender";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Requirements } from "@/components/marketing/requirements";
import { Coaches } from "@/components/marketing/coaches";
import { Testimonials } from "@/components/marketing/testimonials";
import { Policies } from "@/components/marketing/policies";
import { Faq } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <WhyGsd />
      <WhoItsFor />
      <Packages />
      <PackageRecommender />
      <HowItWorks />
      <Requirements />
      <Coaches />
      <Testimonials />
      <Policies />
      <Faq />
      <Footer />
    </main>
  );
}
