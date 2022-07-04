import Navbar from "../../components/Navbar";
import styles from "./LandingPage.module.css";
import HeroCompo from "../../components/heroCompo/HeroCompo";

const LandingPage = () => {
  return (
    <>
      <div className={styles.landingPage}>
        <div className="cs_container">
          <Navbar />
          <HeroCompo />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
