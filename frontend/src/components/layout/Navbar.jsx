import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Search, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { totals } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Collection", path: "/shop" },
    { name: "Brands", path: "/brands" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#f8f5f0]/90 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="shrink-0">
            <span className="text-2xl font-serif tracking-[0.3em] uppercase text-black font-bold">
              ChronoLux
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs uppercase tracking-[0.35em] text-black/60 hover:text-black transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <button className="text-black/60 hover:text-black transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link
              to="/cart"
              className="text-black/60 hover:text-black transition-colors relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totals.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full px-1.5 py-0.5">
                  {totals.itemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-black/60 hover:text-black transition-colors"
                >
                  <User size={20} strokeWidth={1.5} />
                </Link>
                <button
                  onClick={logout}
                  className="text-black/60 hover:text-black transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs uppercase tracking-[0.35em] text-black/60 hover:text-black transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#f8f5f0] border-b border-black/5 py-6"
          >
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.35em] text-black/80"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-black/10 flex space-x-6">
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingBag size={24} strokeWidth={1.5} />
                </Link>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <User size={24} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
