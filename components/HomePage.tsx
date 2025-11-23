import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HomePageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm dark:border dark:border-white/10 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-muted-magenta text-white shadow-lg mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

const Testimonial = ({ quote, author, company, avatar }: { quote: string; author: string; company: string; avatar: string }) => (
    <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm dark:border dark:border-white/10 p-8 rounded-lg shadow-md">
        <img src={avatar} alt={author} className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-muted-magenta" />
        <blockquote className="text-gray-700 dark:text-gray-300 italic text-center">“{quote}”</blockquote>
        <footer className="mt-4 text-center">
            <p className="font-semibold text-gray-900 dark:text-white">{author}</p>
            <p className="text-sm text-muted-magenta dark:text-dusty-pink font-medium">{company}</p>
        </footer>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigateToLogin, onNavigateToSignup }) => {
  return (
    <div className="bg-gray-50 dark:bg-deep-purple text-gray-800 dark:text-gray-200">
      <header className="bg-white/80 dark:bg-deep-purple/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-white/10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-muted-magenta dark:text-dusty-pink">InvoiceGenius</div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <button onClick={onNavigateToLogin} className="text-gray-700 dark:text-gray-300 hover:text-muted-magenta dark:hover:text-dusty-pink font-medium hidden sm:block transition-colors">Sign In</button>
            <button onClick={onNavigateToSignup} className="bg-muted-magenta text-white font-semibold py-2 px-4 rounded-lg hover:bg-dusty-pink transition-all shadow-md transform hover:scale-105">Sign Up Free</button>
          </div>
        </nav>
      </header>

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                    Effortless Invoicing, <br/> Professional Results.
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                   Create, customize, and send beautiful invoices in minutes. Get paid faster and focus on what matters.
                </p>
                <div className="mt-10">
                    <button onClick={onNavigateToSignup} className="bg-muted-magenta text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-dusty-pink transition-all shadow-xl transform hover:scale-105">
                        Get Started for Free
                    </button>
                </div>

                <div className="mt-20 animate-float">
                    <div className="relative w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-muted-magenta dark:text-dusty-pink">INVOICE</h2>
                            <div className="text-sm text-gray-500"># INV-12345</div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-6">
                           <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">FROM</p>
                              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">Your Company</p>
                           </div>
                           <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">TO</p>
                              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">Client Company</p>
                           </div>
                        </div>
                        <div className="mt-6 space-y-2">
                           <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700/50 p-3 rounded-md">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Web Design Services</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">$500.00</span>
                           </div>
                           <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700/50 p-3 rounded-md">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Backend Development</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">$1,500.00</span>
                           </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                            <div className="w-48 space-y-1">
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Subtotal:</span><span>$2,000.00</span></div>
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Tax (5%):</span><span>$100.00</span></div>
                                <div className="flex justify-between font-bold text-gray-900 dark:text-white"><span>Total:</span><span>$2,100.00</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">The Future of Invoicing is Here</h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Smart features designed for modern professionals.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <Feature 
                    icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                    title="Smart & Simple" 
                    description="An intuitive interface makes creating beautiful invoices faster than ever before." 
                />
                <Feature 
                    icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>}
                    title="Brand Customization" 
                    description="Easily add your logo and choose an accent color to create invoices that match your brand identity." 
                />
                <Feature
                    icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    title="Download & Share" 
                    description="Instantly download professional PDFs to send to your clients. Fast, secure, and reliable." 
                />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Trusted by Innovators Worldwide</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Testimonial quote="This is the simplest and most beautiful invoice tool I've ever used. It literally saved me hours every month." author="Jane Doe" company="Creative Designs Co." avatar="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Testimonial quote="As a freelance developer, billing used to be a headache. InvoiceGenius makes it fast and easy, so I can focus on coding." author="John Smith" company="CodeCrafters LLC" avatar="https://i.pravatar.cc/150?u=a042581f4e29026704a" />
                <Testimonial quote="Our clients consistently compliment our new invoices. It's made our small business look so much more professional." author="Emily White" company="White Marketing Group" avatar="https://i.pravatar.cc/150?u=a042581f4e29026704b" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} InvoiceGenius. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;