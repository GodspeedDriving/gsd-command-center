import { Hero } from "@/components/marketing/hero";
import { WhyGsd } from "@/components/marketing/why-gsd";
import { WhoItsFor } from "@/components/marketing/who-its-for";
import { Packages } from "@/components/marketing/packages";
import { PackageRecommender } from "@/components/marketing/package-recommender";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Requirements } from "@/components/marketing/requirements";
import { Instructors } from "@/components/marketing/instructors";
import { Testimonials } from "@/components/marketing/testimonials";
import { Policies } from "@/components/marketing/policies";
import { Faq } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyGsd />
      <WhoItsFor />
      <Packages />
      <PackageRecommender />
      <HowItWorks />
      <Requirements />
      <Instructors />
      <Testimonials />
      <Policies />
      <Faq />
      <Footer />
    </main>
  );
}
