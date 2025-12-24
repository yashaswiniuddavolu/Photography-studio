import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { services } from '../mock';
import '../styles/photography.css';

const Services = () => {
  return (
    <div className="services-page" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section className="section-spacing bg-gray-50">
        <div className="container-photo text-center">
          <h1 className="section-title mb-4">Services & Packages</h1>
          <p className="body-text max-w-2xl mx-auto">
            Professional photography services tailored to your needs. Choose from our packages or let's create a custom solution.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-spacing-large">
        <div className="container-photo">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="service-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="subsection-title mb-3">{service.name}</h3>
                <p className="body-text mb-4">{service.description}</p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <p className="caption-text">Duration</p>
                    <p className="font-semibold">{service.duration}</p>
                  </div>
                  <div className="h-12 w-px bg-gray-300"></div>
                  <div>
                    <p className="caption-text">Starting at</p>
                    <p className="font-semibold text-2xl">{service.price}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="font-semibold mb-3 uppercase text-sm tracking-wider">What's Included:</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={20} className="text-black mt-0.5 flex-shrink-0" />
                        <span className="body-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/booking" className="mt-auto">
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    Book This Package <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="section-spacing bg-black text-white">
        <div className="container-photo text-center">
          <h2 className="section-title text-white mb-4">Need a Custom Package?</h2>
          <p className="body-text text-gray-300 max-w-2xl mx-auto mb-8">
            Every project is unique. Let's discuss your specific needs and create a tailored photography package that fits your vision and budget.
          </p>
          <Link to="/contact">
            <button className="btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              Contact Me
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;