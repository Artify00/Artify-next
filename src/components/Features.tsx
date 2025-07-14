'use client'

import React from 'react';
import { CheckCircleIcon, ClockIcon, DollarSignIcon } from 'lucide-react';
import Link from 'next/link';

export default function Features() {
  return (
    <section className="w-full py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-sans">
            Powerful Features for <span className="text-purple-600">every Artist!</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive protection and verification tools designed to secure
            your artistic investments and build trust with collectors.
          </p>
        </div>
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {/* Feature Block 1 */}
          <div className="p-8 rounded-xl border">
            <CheckCircleIcon className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-4 font-sans">Authenticity Verification</h3>
            <p className="text-gray-600 mb-4">
              Authenticity that goes beyond certificates. Artify secures your
              artwork's story through SPC™ (Secure Provenance Chain) — a
              dual-verification system powered by two independent records: one
              from the artist, and one from the world.
            </p>
            <ul className="space-y-2 mb-4 font-medium">
              <li>• Studio-side data (via Artify)</li>
              <li>• Exhibition history (via Artguide)</li>
              <li>• Timestamped and geo-verified activity</li>
            </ul>
            <p className="italic mb-4 font-medium">Two stories. One truth. Yours.</p>
            <Link href="/services#spc" className="text-purple-600 hover:underline font-medium">
              Learn More →
            </Link>
          </div>

          {/* Feature Block 2 */}
          <div className="p-8 rounded-xl border">
            <ClockIcon className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-4 font-sans">Ownership History Tracking</h3>
            <p className="text-gray-600 mb-4">
              Provenance that moves with the artwork. Every transfer is securely
              logged, timestamped, and geostamped — without compromising
              collector privacy.
            </p>
            <p className="font-semibold mb-4">
              Collectors stay private. The artwork stays traceable.
            </p>
            <Link href="/services#ownership-tracking" className="text-purple-600 hover:underline font-medium">
              Learn More →
            </Link>
          </div>

          {/* Feature Block 3 */}
          <div className="p-8 rounded-xl border">
            <DollarSignIcon className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-4 font-sans">Artist's Resale Right</h3>
            <p className="text-gray-600 mb-4">
              Your art gains value. You should too. Artify makes it possible for
              artists to receive a fair share every time their work is resold —
              by tracking provenance and verifying resale events.
            </p>
            <p className="font-semibold mb-4">
              Because your creativity doesn't expire after the first sale.
            </p>
            <Link href="/services#resale-right" className="text-purple-600 hover:underline font-medium">
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
