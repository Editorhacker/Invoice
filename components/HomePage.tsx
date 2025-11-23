import React from "react";
import ThemeToggle from "./ThemeToggle";
import BoltIcon from "@mui/icons-material/bolt";
import PaletteIcon from "@mui/icons-material/Palette";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

interface HomePageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

const accentColor = "#92487A"; // brand accent

const Feature = ({ icon, title, description }) => (
  <div className="group p-8 rounded-2xl bg-white dark:bg-black/30 dark:backdrop-blur-sm border border-gray-200/50 dark:border-white/10 shadow-md transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 duration-300">
    <div
      className="h-14 w-14 rounded-xl flex items-center justify-center shadow-md mb-5"
      style={{ backgroundColor: accentColor }}
    >
      <div className="text-white">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </div>
);

const Testimonial = ({ quote, author, company, avatar }) => (
  <div className="p-8 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
    <img src={avatar} alt={author} className="w-16 h-16 rounded-full mx-auto mb-4 border-4" style={{ borderColor: accentColor }} />
    <div className="flex justify-center gap-1 mb-3">
      {Array(5).fill(0).map((_, i) => <StarRoundedIcon key={i} fontSize="small" style={{ color: accentColor }} />)}
    </div>
    <blockquote className="text-gray-700 dark:text-gray-300 italic text-center text-lg">“{quote}”</blockquote>
    <footer className="mt-4 text-center">
      <p className="font-semibold text-gray-900 dark:text-white">{author}</p>
      <p className="text-sm font-medium" style={{ color: accentColor }}>{company}</p>
    </footer>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }) => {
  return (
    <div className="bg-gray-50 dark:bg-deep-purple text-gray-800 dark:text-gray-200">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/60 dark:bg-black/30 backdrop-blur-xl shadow-sm border-b border-gray-200/70 dark:border-white/10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={onNavigateToHome} className="text-2xl font-extrabold tracking-tight" style={{ color: accentColor }}>
            InvoiceGenius
          </button>
          <div className="flex items-center gap-6">
            <button className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hidden sm:block"
              onClick={onNavigateToLogin}>
              <span className="after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 hover:after:w-full after:bg-current after:transition-all">Sign In</span>
            </button>
            <button
              onClick={onNavigateToSignup}
              className="py-2.5 px-6 rounded-xl font-semibold text-white shadow-md transition-all hover:scale-[1.04]"
              style={{ backgroundColor: accentColor }}
            >
              Sign Up Free
            </button>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.22] blur-3xl scale-150"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent 72%)` }}
        ></div>
        <div className="container mx-auto px-6 py-28 text-center relative">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            Effortless Invoicing, <br /> Professional Results.
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create, customize, and send stunning invoices in minutes — get paid faster and look more professional.
          </p>
          <button
            onClick={onNavigateToSignup}
            className="mt-10 py-4 px-12 rounded-2xl text-lg font-bold shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all hover:scale-110"
            style={{ backgroundColor: accentColor, color: "white" }}
          >
            Try It Free — No Credit Card
          </button>

          {/* HERO MOCKUP */}
          <div className="mt-20 animate-[float_6s_ease-in-out_infinite]">
            <div className="relative w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold" style={{ color: accentColor }}>INVOICE</h2>
                <div className="text-sm text-gray-500"># INV-12345</div>
              </div>
              <div className="mt-4 text-center text-gray-700 dark:text-gray-300">Invoice preview example...</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            The Future of Invoicing is Here
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Designed for freelancers, agencies, startups & modern businesses.
          </p>
          <div className="mt-20 grid md:grid-cols-3 gap-12">
            <Feature icon={<BoltIcon fontSize="large" />} title="Smart & Simple"
              description="Build invoices in seconds with our intuitive design." />
            <Feature icon={<PaletteIcon fontSize="large" />} title="Brand Customization"
              description="Your logo, your accent color, your professional identity." />
            <Feature icon={<PictureAsPdfIcon fontSize="large" />} title="Download & Share"
              description="Export high-quality PDFs instantly — ready for clients." />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 bg-gray-100 dark:bg-black/20 border-t border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">
            Loved by Professionals Worldwide
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Testimonial quote="This tool literally saved me hours every month." author="Jane Doe" company="Design Studio" avatar="https://i.pravatar.cc/150?img=32" />
            <Testimonial quote="The simplest way I've ever billed clients." author="John Smith" company="CodeCrafters" avatar="https://i.pravatar.cc/150?img=14" />
            <Testimonial quote="Our invoices look premium — clients love it." author="Emily White" company="White Marketing Group" avatar="https://i.pravatar.cc/150?img=21" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Ready to take your invoicing to the next level?
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Create your first invoice today — it takes less than 60 seconds.
        </p>
        <button
          onClick={onNavigateToSignup}
          className="mt-8 py-4 px-14 rounded-2xl text-xl font-bold shadow-xl transition-all hover:scale-110"
          style={{ backgroundColor: accentColor, color: "white" }}
        >
          Start Free Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-white/10 py-10 text-gray-600 dark:text-gray-400">
        <div className="container mx-auto px-6 text-center space-y-3">
          <p>© {new Date().getFullYear()} InvoiceGenius — All rights reserved.</p>
          <p className="text-sm">
            Create professional invoices effortlessly with InvoiceGenius.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
