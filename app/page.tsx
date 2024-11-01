import AllProducts from "@/components/LandingPage/AllProducts";
import Featured from "@/components/LandingPage/Featured";
import Footer from "@/components/LandingPage/Footer";
import { Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack component={"main"} gap={15}>
      <Stack>
        {/* <Hero /> */}
        <Featured />
      </Stack>
        <AllProducts />
      {/* <Reviews /> */}
      {/* <ContactForm /> */}
      <Footer />
    </Stack>
  );
}
