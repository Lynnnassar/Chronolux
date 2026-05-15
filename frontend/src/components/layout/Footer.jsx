import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-[#0b0b0b] text-white border-t border-white/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            ChronoLux
          </p>
          <h3 className="text-3xl font-serif mt-3">
            Timepieces for the modern collector.
          </h3>
          <p className="text-sm text-white/60 mt-4 max-w-sm">
            Crafted in small batches, curated with heritage in mind, and built
            for a life lived deliberately.
          </p>
        </div>
        <div className="space-y-3 text-sm text-white/70">
          <p className="uppercase text-xs tracking-[0.3em] text-white/40">
            Explore
          </p>
          <Link to="/shop">
            <p>Collections</p>
          </Link>
          <Link to="/brands">
            <p>Brands</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
        </div>
        <div className="space-y-3 text-sm text-white/70">
          <p className="uppercase text-xs tracking-[0.3em] text-white/40">
            Concierge
          </p>
          <p>support@chronolux.com</p>
          <p>+961 71 541 417</p>
          <p>Mon - Sat, 9am - 6pm</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
        © 2026 ChronoLux. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
