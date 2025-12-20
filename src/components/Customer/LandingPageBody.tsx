import React from "react";
import { 
  CalendarCheck2, 
  BadgeCheck, 
  Search, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight,
  TrendingUp,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import landingImage from "../../assets/landImage.jpg";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const LandingPageBody: React.FC = () => {
  return (
    <div className="bg-background overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Live Queue Management
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Wait Less, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  Live More.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Join thousands who simplify their day. accurate wait times, instant booking, and zero physical queues.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link to="/customer/signup" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground font-semibold hover:bg-muted transition-all duration-300">
                  For Business
                </button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center text-[10px] font-bold">
                       User
                    </div>
                  ))}
                </div>
                <p>Trusted by 50,000+ happy users</p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-[320px] md:max-w-[380px] z-10">
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="rounded-[2.5rem] border-8 border-gray-900 bg-gray-900 shadow-2xl overflow-hidden"
                >
                   <img
                    src={landingImage}
                    alt="App Interface"
                    className="w-full h-auto rounded-[2rem]"
                  />
                </motion.div>

                {/* Floating Elements */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -right-8 top-20 glass-card p-4 rounded-2xl flex items-center gap-3 animate-pulse-slow"
                >
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <BadgeCheck size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Token Confirmed</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </motion.div>

                 <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -left-8 bottom-40 glass-card p-4 rounded-2xl flex items-center gap-3"
                >
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Wait Time: 5m</p>
                    <p className="text-xs text-muted-foreground">Updated live</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
             {[
               { label: "Active Users", value: "50K+" },
               { label: "Bookings", value: "1M+" },
               { label: "Partners", value: "200+" },
               { label: "Rating", value: "4.9/5" }
             ].map((stat) => (
               <div key={stat.label} className="p-4">
                 <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-1">{stat.value}</h3>
                 <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to queue less</h2>
            <p className="text-muted-foreground text-lg">Powerful features built for speed, reliability, and ease of use.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Smart Discovery",
                desc: "Find services near you instantly with real-time slot availability."
              },
              {
                icon: CalendarCheck2,
                 title: "Instant Booking",
                desc: "Book your spot in seconds. No phone calls, no hassle."
              },
              {
                icon: Zap,
                title: "Live Updates",
                desc: "Track your position in real-time so you know exactly when to leave."
              },
              {
                 icon: ShieldCheck,
                title: "Secure Data",
                desc: "Enterprise-grade encryption keeps your personal info safe."
              },
              {
                icon: Smartphone,
                 title: "Mobile First",
                desc: "Designed for the phone in your pocket. Fast and responsive."
              },
              {
                icon: TrendingUp,
                title: "Analytics",
                desc: "Stores track peak hours and optimize their service efficiency."
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-primary px-8 py-16 md:px-16 text-center shadow-2xl">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
             
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
               Ready to skip the line?
             </h2>
             <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto relative z-10">
               Join the fastest growing queue management platform today. Free for users, powerful for business.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
               <button className="px-8 py-4 rounded-xl bg-white text-primary font-bold hover:bg-gray-50 transition-colors shadow-lg">
                 Download App
               </button>
               <button className="px-8 py-4 rounded-xl border border-white/30 bg-primary-foreground/10 text-white font-bold hover:bg-white/10 transition-colors">
                 Partner with Us
               </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageBody;
