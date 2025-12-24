import React, { useState } from 'react';
import { Calendar } from '../components/ui/calendar';
import { services, timeSlots, bookedDates } from '../mock';
import { toast } from '../hooks/use-toast';
import { Check } from 'lucide-react';
import '../styles/photography.css';

const Booking = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isDateBooked = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return bookedDates.includes(dateStr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: 'Missing Information',
        description: 'Please select service, date, and time.',
        variant: 'destructive'
      });
      return;
    }

    const bookingData = {
      ...formData,
      service: selectedService,
      date: selectedDate,
      time: selectedTime
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        toast({
          title: 'Booking Request Submitted!',
          description: 'Thank you! We\'ll contact you shortly to confirm your booking.',
        });

        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSelectedService('');
        setSelectedDate(null);
        setSelectedTime('');
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your booking. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="booking-page" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section className="section-spacing bg-gray-50">
        <div className="container-photo text-center">
          <h1 className="section-title mb-4">Book Your Session</h1>
          <p className="body-text max-w-2xl mx-auto">
            Ready to create something amazing? Fill out the form below and let's get started.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-spacing-large">
        <div className="container-photo">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="service-card">
                <h3 className="subsection-title mb-6">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block caption-text mb-2 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block caption-text mb-2 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block caption-text mb-2 font-semibold">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div className="service-card">
                <h3 className="subsection-title mb-6">Select Service *</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.name)}
                      className={`p-4 border-2 cursor-pointer transition-all ${
                        selectedService === service.name
                          ? 'border-black bg-gray-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{service.name}</h4>
                          <p className="caption-text mb-2">{service.duration}</p>
                          <p className="font-semibold text-lg">{service.price}</p>
                        </div>
                        {selectedService === service.name && (
                          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="service-card">
                <h3 className="subsection-title mb-6">Select Date *</h3>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today || isDateBooked(date);
                    }}
                    className="border-2 border-gray-200 rounded-none p-4"
                  />
                </div>
                <p className="caption-text text-center mt-4">
                  Dates in gray are already booked. Select an available date.
                </p>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="service-card animate-fade-in-up">
                  <h3 className="subsection-title mb-6">Select Time *</h3>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-4 border-2 transition-all ${
                          selectedTime === time
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-gray-300 hover:border-black'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Message */}
              <div className="service-card">
                <h3 className="subsection-title mb-6">Additional Information</h3>
                <label className="block caption-text mb-2 font-semibold">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about your vision, any specific requirements, or questions you have..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button type="submit" className="btn-primary px-12">
                  Submit Booking Request
                </button>
                <p className="caption-text mt-4">
                  We'll contact you within 24 hours to confirm your booking.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;