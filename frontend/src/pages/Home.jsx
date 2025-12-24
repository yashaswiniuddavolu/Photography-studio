import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Camera, Heart } from 'lucide-react';
import { heroImages, portfolioImages, testimonials, aboutData } from '../mock';
import '../styles/photography.css';

const Home = () => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const featuredImages = portfolioImages.slice(0, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div
          className="hero-background animate-fade-in"
          style={{
            backgroundImage: `url(${heroImages[currentHeroImage]})`,
            transition: 'background-image 1s ease-in-out'
          }}
        />
        <div className="hero-content">
          <div className="animate-fade-in-up">
            <p className="nav-link text-white mb-4">Professional Photography</p>
            <h1 className="hero-title text-white mb-6">
              Capturing Life's
              <br />
              Beautiful Moments
            </h1>
            <p className="body-text text-white max-w-2xl mx-auto mb-8">
              Award-winning photographer specializing in portraits, events, and commercial photography.
              Let's create something extraordinary together.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/portfolio">
                <button className="btn-primary">View Portfolio</button>
              </Link>
              <Link to="/booking">
                <button className="btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                  Book a Session
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing bg-gray-50">
        <div className="container-photo">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="subsection-title mb-2">{stat.value}</div>
                <div className="caption-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="section-spacing-large">
        <div className="container-photo">
          <div className="text-center mb-12">
            <p className="nav-link mb-3">Portfolio</p>
            <h2 className="section-title">Featured Work</h2>
            <p className="body-text max-w-2xl mx-auto">
              A curated selection of my recent projects showcasing diverse photography styles and subjects.
            </p>
          </div>

          <div className="photo-grid-3">
            {featuredImages.map((image, index) => (
              <div key={image.id} className="image-container animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <img src={image.url} alt={image.title} />
                <div className="image-overlay">
                  <div className="image-overlay-text">
                    <span className="category-badge mb-2">{image.category}</span>
                    <h3 className="subsection-title text-white">{image.title}</h3>
                    <p className="caption-text text-gray-200">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio">
              <button className="btn-outline flex items-center gap-2 mx-auto">
                View Full Portfolio <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="section-spacing bg-gray-50">
        <div className="container-photo">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Me</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Award size={28} />
              </div>
              <h3 className="subsection-title text-lg mb-2">Award Winning</h3>
              <p className="caption-text">Recognized for excellence in photography with multiple industry awards</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Users size={28} />
              </div>
              <h3 className="subsection-title text-lg mb-2">500+ Happy Clients</h3>
              <p className="caption-text">Trusted by hundreds of satisfied clients for their special moments</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Camera size={28} />
              </div>
              <h3 className="subsection-title text-lg mb-2">Professional Equipment</h3>
              <p className="caption-text">State-of-the-art cameras and lighting for stunning results</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Heart size={28} />
              </div>
              <h3 className="subsection-title text-lg mb-2">Passion & Dedication</h3>
              <p className="caption-text">Every project is approached with creativity and commitment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing-large">
        <div className="container-photo">
          <div className="text-center mb-12">
            <p className="nav-link mb-3">Testimonials</p>
            <h2 className="section-title">What Clients Say</h2>
          </div>

          <div className="photo-grid-3">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="service-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="caption-text">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="body-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-large bg-black text-white">
        <div className="container-photo text-center">
          <h2 className="section-title text-white mb-6">Ready to Book Your Session?</h2>
          <p className="body-text text-gray-300 max-w-2xl mx-auto mb-8">
            Let's create stunning photography together. Book your session today and bring your vision to life.
          </p>
          <Link to="/booking">
            <button className="btn-primary" style={{ background: 'white', color: 'black', borderColor: 'white' }}>
              Book Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;