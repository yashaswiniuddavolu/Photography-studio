import React, { useState } from 'react';
import { portfolioImages } from '../mock';
import '../styles/photography.css';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', ...new Set(portfolioImages.map(img => img.category))];

  const filteredImages = selectedCategory === 'All'
    ? portfolioImages
    : portfolioImages.filter(img => img.category === selectedCategory);

  return (
    <div className="portfolio-page" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section className="section-spacing bg-gray-50">
        <div className="container-photo text-center">
          <h1 className="section-title mb-4">Portfolio</h1>
          <p className="body-text max-w-2xl mx-auto">
            Explore my diverse collection of photography work spanning portraits, landscapes, fashion, and more.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-spacing">
        <div className="container-photo">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`nav-link px-6 py-2 border-2 transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300 hover:border-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="photo-grid">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="image-container cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.url} alt={image.title} />
                <div className="image-overlay">
                  <div className="image-overlay-text">
                    <span className="category-badge mb-2">{image.category}</span>
                    <h3 className="subsection-title text-white text-xl">{image.title}</h3>
                    <p className="caption-text text-gray-200">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <div className="text-center mt-4 text-white">
              <span className="category-badge mb-2">{selectedImage.category}</span>
              <h3 className="subsection-title text-white mt-2">{selectedImage.title}</h3>
              <p className="caption-text text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;