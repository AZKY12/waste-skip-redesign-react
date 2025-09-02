import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, Users, Award, Leaf, Truck, Phone, MapPin, CheckCircle, Menu, X } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    },
    {
      name: "Kasun Rajapaksa",
      location: "Negombo",
      rating: 5,
      text: "Amazing waste management solutions. They recycled 95% of our construction waste!",
      avatar: "👨‍🔧"
    }
  ];

  const stats = [
    { icon: Users, number: "15,000+", label: "Happy Customers", color: "from-blue-500 to-purple-600" },
    { icon: Truck, number: "25", label: "Districts Served", color: "from-green-500 to-blue-600" },
    { icon: Leaf, number: "95%", label: "Waste Recycled", color: "from-emerald-500 to-green-600" },
    { icon: Award, number: "24/7", label: "Support Available", color: "from-orange-500 to-red-600" }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: "Same Day Delivery",
      description: "Quick response and same-day delivery available across Sri Lanka",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "95% of waste recycled with sustainable disposal methods",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Round-the-clock customer support in Sinhala, Tamil & English",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: MapPin,
      title: "Island-Wide Service",
      description: "Serving all 25 districts with reliable waste management",
      color: "from-orange-500 to-yellow-600"
    }
  ];

  const handleBookingStart = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowBooking(true);
    }, 800);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    // Simulate video modal
    setTimeout(() => {
      setIsVideoPlaying(false);
    }, 3000);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section - Full Viewport */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
            
            {/* Floating particles */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-green-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-emerald-400/30 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Sri Lankan Flag Animation */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 via-green-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce cursor-pointer group-hover:animate-pulse">
                  <span className="text-4xl">🇱🇰</span>
                </div>
                <div className="absolute -inset-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-30 animate-pulse group-hover:opacity-50 transition-opacity"></div>
              </div>
            </div>

            {/* Main Heading with Enhanced Animation */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-in-up">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
                EcoSkip Lanka
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-light italic animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
                Sustainable Waste Solutions
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              Sri Lanka's premier eco-friendly skip hire service. Professional waste management 
              across all 25 districts with same-day delivery and 95% recycling rate.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-scale" style={{ animationDelay: '0.9s' }}>
              <button
                onClick={handleBookingStart}
                disabled={isLoading}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 min-w-[220px] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      Book Skip Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </button>
              
              <button 
                onClick={handleVideoPlay}
                className="group flex items-center gap-3 px-6 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[180px]"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Enhanced Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20 animate-slide-in-up cursor-pointer group"
                    style={{ animationDelay: `${1.2 + index * 0.2}s` }}
                    onClick={() => scrollToSection('features')}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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

            {/* Enhanced Scroll Indicator */}
            <button 
              onClick={() => scrollToSection('features')}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:animate-pulse transition-all duration-300 group cursor-pointer"
            >
              <div className="w-8 h-12 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center group-hover:border-green-500 transition-colors">
                <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse group-hover:bg-green-500 transition-colors"></div>
              </div>
              <span className="sr-only">Scroll to features</span>
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-in-up">
                Why Choose EcoSkip Lanka?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
                Leading Sri Lanka's sustainable waste revolution with innovative solutions and unmatched service quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700 cursor-pointer animate-slide-in-up"
                    style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                    onClick={() => scrollToSection('testimonials')}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-green-900/20 dark:to-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-in-up">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
                Trusted by thousands across Sri Lanka
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 animate-fade-in-scale">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex space-x-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-xl text-gray-700 dark:text-gray-300 text-center mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                
                <div className="flex items-center justify-center">
                  <div className="text-4xl mr-4 animate-bounce">{testimonials[currentTestimonial].avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Testimonial Indicators */}
              <div className="flex justify-center mt-6 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                      index === currentTestimonial
                        ? 'bg-green-500 scale-125 shadow-lg'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-green-400 hover:shadow-md'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-slide-in-up">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
              Join thousands of Sri Lankans who trust EcoSkip Lanka for their waste management needs. 
              Book your skip today and contribute to a cleaner, greener Sri Lanka.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={handleBookingStart}
                disabled={isLoading}
                className="px-8 py-4 bg-white text-green-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 min-w-[220px] disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    Starting...
                  </div>
                ) : (
                  <span className="group-hover:text-green-700 transition-colors">Start Booking Now</span>
                )}
              </button>
              
              <a
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 min-w-[200px] group"
              >
                <span className="group-hover:text-green-600 transition-colors">Get Free Quote</span>
              </a>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm max-w-4xl mx-auto animate-fade-in-scale" style={{ animationDelay: '0.9s' }}>
              {[
                { icon: CheckCircle, text: "Free Delivery" },
                { icon: CheckCircle, text: "Same Day Service" },
                { icon: CheckCircle, text: "All Permits Handled" },
                { icon: CheckCircle, text: "24/7 Support" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center gap-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in-scale">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl mx-4 relative">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Demo Video</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Watch how easy it is to book your skip with EcoSkip Lanka
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;