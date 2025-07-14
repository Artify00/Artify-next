'use client'

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <Link href="/">
                <img src="/Artify_Logo_purple_clear.png" alt="Artify" className="h-10" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 font-sans">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/services" className="text-gray-600 hover:text-purple-600">Features</Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600">For Artists</Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600">Pricing</Link>
              <Link href="/services#faq" className="text-gray-600 hover:text-purple-600">Support</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 font-sans">Resources</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-gray-600 hover:text-purple-600">Blog</Link>
              <a href="mailto:info@artifynow.net" className="text-gray-600 hover:text-purple-600">Help Center</a>
              <Link href="#" className="text-gray-600 hover:text-purple-600">API Documentation</Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600">Community</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 font-sans">Contact Us</h3>
            <div className="flex flex-col gap-2 text-gray-600">
              <p>info@artifynow.net</p>
              <p>No.402 UN Village 1Gil 48</p>
              <p>Seoul, Korea 04420</p>
            </div>
          </div>
        </div>
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">© 2024 Artify. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-purple-600">Privacy Policy</Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600">Terms of Service</Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
