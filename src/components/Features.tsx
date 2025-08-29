import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  BarChart3, 
  Home, 
  QrCode, 
  Workflow, 
  Clock, 
  Smartphone, 
  Users, 
  Shield, 
  Mail 
} from "lucide-react";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: BarChart3,
      title: "Live Dashboards",
      description: "Real-time attendance tracking with comprehensive analytics and visual reports"
    },
    {
      icon: Home,
      title: "Leave from Home",
      description: "Remote attendance marking for hybrid learning environments"
    },
    {
      icon: QrCode,
      title: "QR Code Based",
      description: "Secure, contactless attendance marking using unique QR codes"
    },
    {
      icon: Workflow,
      title: "Easy Integration",
      description: "Seamless integration with existing systems and platforms"
    },
    {
      icon: Clock,
      title: "Real-Time Reports",
      description: "Instant attendance reports with detailed insights and trends"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Optimized mobile experience for students and faculty"
    },
    {
      icon: Users,
      title: "Admin & Student Panels",
      description: "Separate interfaces tailored for administrators and students"
    },
    {
      icon: Shield,
      title: "Secure Check-In/Out",
      description: "Advanced security protocols for reliable attendance tracking"
    },
    {
      icon: Mail,
      title: "Email Alerts",
      description: "Automated notifications for low attendance and important updates"
    }
  ];

  return (
    <section id="features" className="py-20">
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
            Powerful <span className="gradient-text">Features</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Everything you need to manage attendance efficiently and effectively. 
            From QR codes to analytics, we've got you covered.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 100 }}
              className="group"
            >
              <div className="glass p-8 rounded-2xl hover-glow transition-all duration-300 group-hover:scale-105 h-full flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">&lt;2s</div>
            <div className="text-muted-foreground">Average Check-in Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">System Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}