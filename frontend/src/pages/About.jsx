import React from 'react';
import { Award, Camera, Heart, Zap } from 'lucide-react';
import { aboutData } from '../mock';
import '../styles/photography.css';

const About = () => {
  return (
    <div className="about-page" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section className="section-spacing bg-gray-50">
        <div className="container-photo text-center">
          <h1 className="section-title mb-4">About Me</h1>
          <p className="body-text max-w-2xl mx-auto">
            Passionate photographer dedicated to capturing life's most precious moments with creativity and artistry.
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="section-spacing-large">
        <div className="container-photo">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <img
                src={aboutData.image}
                alt={aboutData.name}
                className="w-full h-auto object-cover"
                style={{ maxHeight: '600px' }}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="nav-link mb-3">Professional Photographer</p>
              <h2 className="section-title mb-6">{aboutData.name}</h2>
              <p className="body-text mb-6">{aboutData.bio}</p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                {aboutData.stats.map((stat, index) => (
                  <div key={index}>
                    <div className="subsection-title">{stat.value}</div>
                    <div className="caption-text">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-spacing bg-gray-50">
        <div className="container-photo">
          <div className="text-center mb-12">
            <h2 className="section-title">My Approach</h2>
            <p className="body-text max-w-2xl mx-auto">
              Every photograph tells a story. Here's how I bring your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Camera size={28} />
              </div>
              <h3 className="subsection-title text-lg mb-2">Professional Equipment</h3>
              <p className="caption-text">
                Using industry-leading cameras and lenses to ensure the highest quality results
              </p>
            </div>

            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Heart size={28} />
              </div>
              <h3 className="subsection-title text-lg mb-2">Passionate Storytelling</h3>
              <p className="caption-text">
                Every image is crafted with care to tell your unique story authentically
              </p>
            </div>

            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Zap size={28} />
              </div>
              <h3 className="subsection-title text-lg mb-2">Quick Turnaround</h3>
              <p className="caption-text">
                Efficient workflow ensuring you receive your edited photos within 2 weeks
              </p>
            </div>

            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Award size={28} />
              </div>
              <h3 className="subsection-title text-lg mb-2">Award-Winning Quality</h3>
              <p className="caption-text">
                Recognized excellence with multiple photography awards and client satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-spacing-large">
        <div className="container-photo">
          <div className="text-center mb-12">
            <h2 className="section-title">Journey & Experience</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="service-card animate-fade-in-up">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-gray-300">2015</div>
                <div>
                  <h3 className="subsection-title text-lg mb-2">Started Photography Journey</h3>
                  <p className="body-text">
                    Began professional photography career, focusing on portrait and event photography.
                  </p>
                </div>
              </div>
            </div>

            <div className="service-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-gray-300">2018</div>
                <div>
                  <h3 className="subsection-title text-lg mb-2">Expanded to Commercial Work</h3>
                  <p className="body-text">
                    Grew business to include commercial and fashion photography for brands and agencies.
                  </p>
                </div>
              </div>
            </div>

            <div className="service-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-gray-300">2021</div>
                <div>
                  <h3 className="subsection-title text-lg mb-2">International Recognition</h3>
                  <p className="body-text">
                    Received multiple photography awards and featured in prominent photography magazines.
                  </p>
                </div>
              </div>
            </div>

            <div className="service-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-gray-300">2025</div>
                <div>
                  <h3 className="subsection-title text-lg mb-2">Present Day</h3>
                  <p className="body-text">
                    Continuing to create stunning photography for clients worldwide with 500+ successful projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;