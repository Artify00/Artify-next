'use client'

import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="w-full bg-purple-50">
      <div className="w-full py-16 px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white border">
              <span className="text-sm font-medium">Trusted by 10,000+ Artists</span>
            </div>
            <h1 className="mb-5 font-sans">
              <span className="text-4xl text-gray-900 block mb-1 font-bold">Great ART deserves to last.</span>
              <span className="text-4xl text-gray-900 block mb-1 font-bold">Claim your legacy.</span>
              <span className="text-5xl text-purple-600 font-bold">Artify it now.</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Secure authenticity, track provenance, and claim your Artist Resale Rights!
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/services" className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium">
                Learn More
              </Link>
              <Link href="/signup" className="bg-white border border-purple-600 text-purple-600 px-6 py-3 rounded-md hover:bg-purple-50 font-medium">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 min-h-[255px] md:min-h-[340px]">
            <div
              className="w-full h-full rounded-lg bg-cover bg-center shadow-lg"
              style={{
                backgroundImage: "url('https://uploadthingy.s3.us-west-1.amazonaws.com/9cuL2o2YcdJ1jmDy3PA5bX/canvas_back.jpg')",
                minHeight: '255px'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
