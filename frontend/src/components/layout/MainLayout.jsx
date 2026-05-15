import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#111] font-sans selection:bg-black selection:text-white">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-20"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};

export default MainLayout;
