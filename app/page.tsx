import AllProducts from "@/components/LandingPage/AllProducts";
import ContactForm from "@/components/LandingPage/ContactForm";
import Featured from "@/components/LandingPage/Featured";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Reviews from "@/components/LandingPage/Reviews";
import { Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack component={"main"} gap={15}>
      <Stack>
        <Hero />
        <Featured />
      </Stack>
      <AllProducts />
      <Reviews />
      <ContactForm />
      <Footer />
    </Stack>
  );
}
