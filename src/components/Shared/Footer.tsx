import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
                Q
              </span>
              <span className="font-bold text-xl tracking-tight">EasyQ</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Revolutionizing the way you wait. Skip the lines and save your time with our smart token system.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Facebook} />
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Instagram} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Product</h3>
            <ul className="space-y-4 text-sm">
              <FooterLink to="/" label="Features" />
              <FooterLink to="/" label="Pricing" />
              <FooterLink to="/" label="For Business" />
              <FooterLink to="/" label="For Customers" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <FooterLink to="/" label="Help Center" />
              <FooterLink to="/" label="Status" />
              <FooterLink to="/" label="Contact Us" />
              <FooterLink to="/" label="API Documentation" />
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-4 text-sm">
              <FooterLink to="/" label="Privacy Policy" />
              <FooterLink to="/" label="Terms of Service" />
              <FooterLink to="/" label="Cookie Policy" />
              <FooterLink to="/" label="Security" />
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Easy-Q. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <a
    href={href}
    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary hover:text-white transition-all duration-300"
    target="_blank"
    rel="noreferrer"
  >
    <Icon size={18} />
  </a>
);

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link to={to} className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
      {label}
    </Link>
  </li>
);

export default Footer;
