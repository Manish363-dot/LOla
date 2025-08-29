import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, UserCheck, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <>
      <footer className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="relative glass border-t border-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center space-x-2 mb-4"
                >
                  <UserCheck className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold gradient-text">Attendo</span>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-muted-foreground mb-6"
                >
                  Revolutionizing attendance management with smart, secure, and scalable solutions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex space-x-4"
                >
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors hover-glow"
                    >
                      <social.icon className="h-5 w-5 text-primary" />
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-1">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-lg font-semibold mb-4"
                >
                  Quick Links
                </motion.h3>
                
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-3"
                >
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              </div>

              {/* Features */}
              <div className="md:col-span-1">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-lg font-semibold mb-4"
                >
                  Features
                </motion.h3>
                
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-3 text-muted-foreground"
                >
                  <li>QR Code Attendance</li>
                  <li>Real-time Analytics</li>
                  <li>Mobile App</li>
                  <li>Admin Dashboard</li>
                </motion.ul>
              </div>

              {/* Contact Info */}
              <div className="md:col-span-1">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-lg font-semibold mb-4"
                >
                  Contact
                </motion.h3>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-3 text-muted-foreground"
                >
                  <p>contact@attendo.com</p>
                  <p>+1 (555) 123-4567</p>
                  <p>123 Tech Street<br />San Francisco, CA</p>
                </motion.div>
              </div>
            </div>

            {/* Bottom Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-primary/20"
            >
              <p className="text-muted-foreground text-sm mb-4 md:mb-0">
                © 2024 Attendo. All rights reserved. Built with ❤️ for educational institutions.
              </p>
              
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground text-sm">Privacy Policy</span>
                <span className="text-muted-foreground text-sm">Terms of Service</span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Button
          onClick={scrollToTop}
          size="sm"
          className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover-glow animate-float"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </>
  );
}