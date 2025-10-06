import React from "react";
import { CalendarCheck2, BadgeCheck, Search, Clock, ShieldCheck, Smartphone, Users } from "lucide-react";
import landingImage from '../../assets/landImage.jpg'



const steps = [
  { title: "Find a Shop", desc: "Search for nearby businesses offering token booking services you need.", Icon: Search },
  { title: "Book Your Slot", desc: "Select a convenient time window and generate your digital token instantly.", Icon: CalendarCheck2 },
  { title: "Get Served", desc: "Show up at the right time and skip the physical queue effortlessly.", Icon: BadgeCheck },
];

const stats = [
  { k: "50K+", v: "Bookings Processed" },
  { k: "1,200+", v: "Businesses Onboarded" },
  { k: "4.9/5", v: "Customer Satisfaction" },
];

const features = [
  { title: "Save Time", desc: "No more waiting in line — manage your bookings in just a few taps.", Icon: Clock },
  { title: "Trusted & Secure", desc: "Your data and payments are protected with top-grade security.", Icon: ShieldCheck },
  { title: "Mobile Friendly", desc: "Book, track, and manage queues directly from your phone.", Icon: Smartphone },
  { title: "For Everyone", desc: "Businesses of any size can provide a seamless customer experience.", Icon: Users },
];

const LandingPageBody: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#ffffff] to-[#92beff]">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Simplify Your Booking.
              <br />
              <span className="text-gray-800">Skip the </span>
              <span className="text-indigo-600">Wait</span>
              <span className="text-gray-800">, Get a Token!</span>
            </h1>
            <p className="text-gray-600 max-w-lg">
              Book services instantly, manage queues effortlessly, and save valuable time.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg">
                Get Started
              </button>

              <button 
              
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition duration-300">
                For Businesses
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden">
              <img
                src={landingImage}
                alt="Mobile app preview showing tokens and booking screen"
                className="w-full rounded-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">How It Works</h2>
          <p className="text-gray-500 mt-2 mb-12">Simple steps to skip the queue and save your time</p>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {steps.map(({ title, desc, Icon }) => (
              <div key={title} className="flex flex-col items-center text-center gap-4 px-4 py-6 bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-indigo-100">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3 text-center">
            {stats.map((s) => (
              <div key={s.v} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition duration-300">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{s.k}</div>
                <div className="text-gray-500 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Why It's So Good</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-2">
              Our app simplifies your booking experience in just a few taps.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, desc, Icon }) => (
              <div key={title} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 mb-4">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
                <p className="text-gray-500 mt-1 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
       <section aria-labelledby="cta-title" className="bg-[#3B82F6] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="text-center space-y-4">
          <h2 id="cta-title" className="text-pretty text-2xl md:text-3xl font-extrabold">
            Ready to Get Started?
          </h2>
          <p className="opacity-90 max-w-2xl mx-auto">
            Join now and experience real‑time bookings. Skip lines, save time.
          </p>
          <button  className="rounded-full text-[#3B82F6] bg-white px-5 py-2 font-bold">
            Sign Up Today
          </button>
        </div>
      </div>
    </section>
    </div>
  );
};

export default LandingPageBody;
