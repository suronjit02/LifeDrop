import ContactSection from "../components/home/ContactSection";
import FeturedSection from "../components/home/FeturedSection";
import HeroSection from "../components/home/HeroSection";
import MotoSection from "../components/home/MotoSection";
import RecentDonationStories from "../components/home/RecentDonationStories";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <MotoSection></MotoSection>
      <RecentDonationStories></RecentDonationStories>
      <FeturedSection></FeturedSection>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;
