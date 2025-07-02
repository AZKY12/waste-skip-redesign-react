import React from 'react';
import { Award, Users, Leaf, Shield, Target, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Leaf,
      title: 'Environmental Responsibility',
      description: 'Committed to sustainable waste management practices that protect Sri Lanka\'s natural beauty.'
    },
    {
      icon: Shield,
      title: 'Reliability & Trust',
      description: 'Dependable service delivery with transparent pricing and professional standards.'
    },
    {
      icon: Heart,
      title: 'Community Focus',
      description: 'Supporting local communities through responsible waste management and job creation.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Continuously improving our services with modern technology and best practices.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '25', label: 'Districts Served' },
    { number: '95%', label: 'Waste Recycled' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-green-900">
      {/* Hero Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About EcoSkip Lanka
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Leading the way in sustainable waste management across Sri Lanka with innovative solutions 
              and unwavering commitment to environmental protection.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Founded in 2015, EcoSkip Lanka began with a simple mission: to provide Sri Lanka 
                  with reliable, environmentally responsible waste management solutions. What started 
                  as a small family business in Colombo has grown into the island's most trusted 
                  skip hire and waste management company.
                </p>
                <p>
                  Our journey has been driven by a deep commitment to protecting Sri Lanka's pristine 
                  environment while serving our communities with excellence. We've pioneered innovative 
                  recycling programs, introduced modern waste sorting technologies, and built partnerships 
                  with local councils across all 25 districts.
                </p>
                <p>
                  Today, we're proud to serve over 10,000 satisfied customers, from individual homeowners 
                  to large construction companies, all while maintaining our core values of sustainability, 
                  reliability, and community service.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg p-8">
              <div className="text-center">
                <Award className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Award-Winning Service
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Recognized by the Sri Lanka Environmental Authority for outstanding 
                  contribution to sustainable waste management practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet the dedicated professionals who make EcoSkip Lanka the trusted choice for waste management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Experienced Leadership
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our management team brings over 50 years of combined experience in waste management and environmental services.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Certified Professionals
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All our staff are trained and certified in safety protocols, environmental standards, and customer service excellence.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Community Champions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're proud to employ local talent and contribute to the economic development of communities across Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Be part of Sri Lanka's sustainable future. Choose EcoSkip Lanka for all your waste management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Book Our Services
            </a>
            <a
              href="/contact"
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;