import React from 'react';
import { Truck, Recycle, Leaf, Building, Home, Factory } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Truck,
      title: 'Skip Hire Services',
      description: 'Professional skip hire for all your waste disposal needs. Available in various sizes from 4 to 40 cubic yards.',
      features: ['Same-day delivery available', 'Flexible hire periods', 'Competitive pricing', 'All permits handled']
    },
    {
      icon: Recycle,
      title: 'Waste Recycling',
      description: 'Comprehensive recycling services to minimize environmental impact and maximize resource recovery.',
      features: ['Metal recycling', 'Paper & cardboard', 'Plastic processing', 'Glass collection']
    },
    {
      icon: Leaf,
      title: 'Green Waste Collection',
      description: 'Specialized collection and composting services for garden and organic waste materials.',
      features: ['Garden clearance', 'Tree cutting waste', 'Composting services', 'Organic waste processing']
    },
    {
      icon: Building,
      title: 'Construction Waste',
      description: 'Safe and efficient disposal of construction and demolition waste with proper sorting and recycling.',
      features: ['Concrete & rubble', 'Timber & wood', 'Metal & steel', 'Plasterboard disposal']
    },
    {
      icon: Home,
      title: 'Household Clearance',
      description: 'Complete household clearance services for moving, downsizing, or general decluttering.',
      features: ['Furniture removal', 'Appliance disposal', 'General household items', 'Estate clearances']
    },
    {
      icon: Factory,
      title: 'Commercial Waste',
      description: 'Tailored waste management solutions for businesses, offices, and commercial properties.',
      features: ['Regular collections', 'Bulk waste removal', 'Office clearances', 'Retail waste management']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-green-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive waste management solutions for residential, commercial, and industrial needs across Sri Lanka
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact us today for a free quote or to discuss your specific waste management requirements. 
            Our team is ready to provide you with the best solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Book Skip Hire
            </a>
            <a
              href="/contact"
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;