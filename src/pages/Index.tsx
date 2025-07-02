import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, Users, Award, Leaf, Truck, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import PostcodeStep from '../components/PostcodeStep';
import WasteTypeStep from '../components/WasteTypeStep';
import SkipSelection from '../components/SkipSelection';
import PermitCheckStep from '../components/PermitCheckStep';
import DateSelectionStep from '../components/DateSelectionStep';
import PaymentStep from '../components/PaymentStep';

const Index = () => {
  const { currentStep } = useBooking();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [showBooking, setShowBooking] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Priya Perera",
      location: "Colombo",
      rating: 5,
      text: "Excellent service! They delivered on time and handled all the permits. Very professional team.",
      avatar: "🙋‍♀️"
    },
    {
      name: "Rohan Silva",
      location: "Kandy",
      rating: 5,
      text: "Best skip hire service in Sri Lanka. Competitive prices and eco-friendly approach.",
      avatar: "👨‍💼"
    },
    {
      name: "Amara Fernando",
      location: "Galle",
      rating: 5,
      text: "Used them for our construction project. Reliable, punctual, and great customer service.",
      avatar: "👷‍♀️"
    }
  ];

  const stats = [
    { icon: Users, number: "10,000+", label: "Happy Customers" },
    { icon: Truck, number: "25", label: "Districts Served" },
    { icon: Leaf, number: "95%", label: "Waste Recycled" },
    { icon: Award, number: "24/7", label: "Support Available" }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: "Same Day Delivery",
      description: "Quick response and same-day delivery available across Sri Lanka"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "95% of waste recycled with sustainable disposal methods"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Round-the-clock customer support in Sinhala, Tamil & English"
    },
    {
      icon: MapPin,
      title: "Island-Wide Service",
      description: "Serving all 25 districts with reliable waste management"
    }
  ];

  if (showBooking) {
    const renderCurrentStep = () => {
      switch (currentStep) {
        case 'postcode':
          return <PostcodeStep />;
        case 'waste-type':
          return <WasteTypeStep />;
        case 'skip-size':
          return <SkipSelection />;
        case 'permit':
          return <PermitCheckStep />;
        case 'date-selection':
          return <DateSelectionStep />;
        case 'payment':
          return <PaymentStep />;
        default:
          return <PostcodeStep />;
      }
    };

    return renderCurrentStep();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 overflow-hidden">
      {/* Hero Section - Full Viewport */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Sri Lankan Flag Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-green-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <span className="text-3xl">🇱🇰</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-30 animate-pulse"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
              EcoSkip Lanka
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-light italic">
              Sustainable Waste Solutions
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Sri Lanka's premier eco-friendly skip hire service. Professional waste management 
            across all 25 districts with same-day delivery and 95% recycling rate.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => setShowBooking(true)}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book Skip Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
            </button>

            <button className="group flex items-center gap-3 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-white ml-1" />
              </div>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose EcoSkip Lanka?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Leading Sri Lanka's sustainable waste revolution with innovative solutions and unmatched service quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Trusted by thousands across Sri Lanka
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-xl text-gray-700 dark:text-gray-300 text-center mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center justify-center">
                <div className="text-4xl mr-4">{testimonials[currentTestimonial].avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].location}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-green-500 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-green-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of Sri Lankans who trust EcoSkip Lanka for their waste management needs. 
            Book your skip today and contribute to a cleaner, greener Sri Lanka.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowBooking(true)}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 min-w-[200px]"
            >
              Start Booking Now
            </button>
            
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            >
              Get Free Quote
            </a>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Same Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>All Permits Handled</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;