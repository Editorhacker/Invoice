import Link from "next/link";
import { ArrowRight, Globe, FileText, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto -mt-20 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900">InvoiceApp</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition">
              Login
            </Link>
            <Link href="/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-24 pb-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            New: PDF Export Available
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-gray-900">
            Invoicing made <span className="text-indigo-600">simple</span> for freelancers.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create professional invoices in seconds, manage clients, and track payments. No complex features, just what you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white text-lg px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 text-lg px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition">
              View Demo
            </Link>
          </div>

          {/* Hero Image / Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
              {/* Abstract representation of the app UI */}
              <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-8 grid grid-cols-12 gap-8 text-left">
                <div className="col-span-3 space-y-4 hidden md:block">
                  <div className="h-8 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-50 rounded w-full"></div>
                  <div className="h-4 bg-gray-50 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-50 rounded w-4/6"></div>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-indigo-50 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-100 rounded w-24"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-20 bg-white border border-gray-100 rounded-lg shadow-sm p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                        <div className="h-2 bg-gray-50 rounded w-1/3"></div>
                      </div>
                      <div className="h-6 bg-green-50 rounded w-16"></div>
                    </div>
                    <div className="h-20 bg-white border border-gray-100 rounded-lg shadow-sm p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                        <div className="h-2 bg-gray-50 rounded w-1/3"></div>
                      </div>
                      <div className="h-6 bg-yellow-50 rounded w-16"></div>
                    </div>
                    <div className="h-20 bg-white border border-gray-100 rounded-lg shadow-sm p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                        <div className="h-2 bg-gray-50 rounded w-1/3"></div>
                      </div>
                      <div className="h-6 bg-red-50 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to get paid
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features packaged in a simple, easy-to-use interface.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Custom Branding</h3>
              <p className="text-gray-600 leading-relaxed">
                Make your invoices look professional. Upload your logo and choose your brand colors to stand out.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Multi-Currency</h3>
              <p className="text-gray-600 leading-relaxed">
                Work with clients worldwide. We support USD, EUR, GBP, and many more currencies with automatic formatting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 text-green-600">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">PDF Export</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate clean, professional PDF invoices instantly. Download and send them to your clients in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
              <FileText className="text-white" size={14} />
            </div>
            <span className="text-lg font-bold text-gray-900">InvoiceApp</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} InvoiceApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
