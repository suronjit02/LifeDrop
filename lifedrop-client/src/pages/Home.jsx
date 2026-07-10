import ContactSection from "../components/home/ContactSection";
import HeroSection from "../components/home/HeroSection";
import HowWorkSection from "../components/home/HowWorkSection";
import LiveStats from "../components/home/LiveStats";
import MotoSection from "../components/home/MotoSection";
import RecentDonationStories from "../components/home/RecentDonationStories";
import WhyDonateBlood from "../components/home/WhyDonateBlood";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <LiveStats></LiveStats>
      <MotoSection></MotoSection>
      <WhyDonateBlood></WhyDonateBlood>
      <RecentDonationStories></RecentDonationStories>
      <HowWorkSection></HowWorkSection>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;
