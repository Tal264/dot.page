import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
// import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Stats />
      <Portfolio />
      <Testimonials />
      {/* <Pricing /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
