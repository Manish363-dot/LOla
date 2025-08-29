import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Users, Award } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Advanced encryption and security protocols to protect your data"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant attendance marking with real-time synchronization"
    },
    {
      icon: Users,
      title: "User Friendly",
      description: "Intuitive interface designed for students, teachers, and administrators"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Trusted by top institutions with 99.9% accuracy rate"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About <span className="gradient-text">Attendo</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Revolutionizing attendance management with cutting-edge QR code technology, 
            real-time analytics, and seamless integration. Built for the modern educational institution.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group"
            >
              <div className="glass p-8 rounded-2xl hover-glow transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 gradient-text">
              Why Choose Attendo?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our platform combines the simplicity of QR codes with powerful analytics and reporting. 
              From small classrooms to large universities, Attendo scales with your needs while maintaining 
              the highest standards of security and reliability. Join thousands of satisfied users who have 
              transformed their attendance management experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}