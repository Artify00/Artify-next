'use client'

import React from 'react';
import { StarIcon } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="w-full py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-10 font-sans">
        Trusted by <span className="text-purple-600">Artists Worldwide</span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 rounded-xl border">
            <div className="flex items-center gap-4 mb-4">
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-bold font-sans">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm">{testimonial.title}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{testimonial.quote}</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-purple-600 fill-current" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: 'Sarah Chen',
    title: 'Contemporary Artist',
    quote:
      'Artify gave me the confidence to sell my work knowing that my authenticity and resale rights are protected. The secure verification system is a game-changer for emerging artists.',
    image: '/Screenshot_2025-06-23_at_2.20.05_PM.png',
  },
  {
    name: 'Marcus Rodriguez',
    title: 'Digital Sculptor',
    quote:
      'The ownership history tracking has been invaluable for my collectors. They love being able to see the complete provenance of each piece.',
    image: '/Screenshot_2025-06-23_at_2.19.59_PM.png',
  },
  {
    name: 'Emma Thompson',
    title: 'Mixed Media Artist',
    quote:
      "I've earned more from my resale rights through Artify than I initially thought possible. It's like having a passive income stream from my past work.",
    image: '/Screenshot_2025-06-23_at_2.20.11_PM.png',
  },
];
