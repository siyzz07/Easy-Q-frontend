import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Rocket, 
  Heart,
  Award
} from "lucide-react";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-20 px-4 border-b border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm mb-6"
          >
            <Rocket size={16} />
            <span>Our Journey Started Here</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Redefining How You <br />
            <span className="text-blue-600 italic">Experience Services</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Easy Q is more than just a booking platform. We're a bridge connecting you 
            to the best local professionals, ensuring every interaction is seamless, 
            trusted, and efficient.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Active Users", value: "10K+", icon: Users, color: "text-blue-600" },
              { label: "Verified Shops", value: "500+", icon: ShieldCheck, color: "text-emerald-500" },
              { label: "Appointments", value: "50K+", icon: Clock, color: "text-purple-500" },
              { label: "Cities Covered", value: "25+", icon: MapPin, color: "text-orange-500" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-4">
                <Target className="text-blue-600" size={32} />
                Our Mission
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                To empower local service providers and customers through an 
                all-in-one digital ecosystem that simplifies scheduling, 
                enhances trust, and saves precious time for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Quality Focus", desc: "Curating only the best professionals.", icon: Award },
                { title: "Customer First", desc: "Building everything around your needs.", icon: Heart },
              ].map((value, idx) => (
                <div key={idx} className="p-6 rounded-[24px] bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-4">
                    <value.icon size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{value.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[48px] overflow-hidden bg-slate-100 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000&auto=format&fit=crop" 
                alt="Our Team" 
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-[32px] shadow-2xl border border-white/50 max-w-xs text-center">
                  <h4 className="text-2xl font-black text-slate-900 mb-2">Since 2024</h4>
                  <p className="text-slate-500 font-medium">Helping thousands of people find quality services every day.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Values We Live By</h2>
            <p className="text-slate-500 text-lg">Foundation of our platform culture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                desc: "No hidden fees, no surprises. Just clear pricing and real reviews from real people.",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                title: "Reliability",
                desc: "Real-time updates and instant confirmations. We value your schedule as much as you do.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Innovation",
                desc: "Constantly evolving with AI and smart location tech to make booking faster and simpler.",
                gradient: "from-emerald-500 to-teal-500"
              }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient} rounded-[32px] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="relative bg-white h-full p-10 rounded-[32px] border border-slate-100 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                  <h4 className="text-2xl font-black text-slate-900 mb-4">{v.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900 rounded-[48px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-30" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-30" />
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10">
              Ready to experience <br />the difference?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
              Join thousands of satisfied users who have simplified their lives with Easy Q.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black text-lg shadow-2xl relative z-10 hover:bg-blue-700 transition-colors"
            >
              Start Booking Now
            </motion.button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
