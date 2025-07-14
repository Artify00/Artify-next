'use client'

import React, { useState } from 'react';
import { XIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon, MapPinIcon, ClockIcon, MonitorIcon, QrCodeIcon } from 'lucide-react';
type Artwork = {
  id: number;
  title: string;
  artist: string;
  artistEmail: string;
  image: string;
  medium: string;
  year: number;
  status: string;
  price: string;
  createdDate: string;
  description?: string;
  dimensions?: string;
  provenance?: string;
  certificate?: boolean;
  exhibitionHistory?: string[];
  qrCode?: string;
};
type AdminArtworkDetailModalProps = {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
};
export const AdminArtworkDetailModal = ({
  artwork,
  isOpen,
  onClose
}: AdminArtworkDetailModalProps) => {
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'scans'
  // Early return if modal shouldn't be shown
  if (!isOpen || !artwork) return null;
  // Mock artwork additional details
  const artworkDetails = {
    description: artwork.description || "This piece explores the interplay between light and shadow, creating a dynamic visual experience that changes with the viewer's perspective.",
    dimensions: artwork.dimensions || `${30 + artwork.id * 5}cm × ${40 + artwork.id * 3}cm`,
    provenance: artwork.provenance || 'Original creation, first registered in 2023',
    certificate: artwork.certificate !== undefined ? artwork.certificate : true,
    exhibitionHistory: artwork.exhibitionHistory || (artwork.id % 3 === 0 ? ['Contemporary Art Gallery, New York, 2023', 'International Art Fair, London, 2022'] : []),
    transferCount: artwork.id % 5,
    viewCount: 120 + artwork.id * 10,
    lastVerified: artwork.status === 'Verified' ? '2 weeks ago' : 'Not verified',
    qrCode: `ART-${String(artwork.id).padStart(6, '0')}`
  };
  // Find the QR code data for this artwork
  const qrCodeData = mockQRCodes.find(qr => qr.artwork === artwork.title) || null;
  const handleVerifyArtwork = () => {
    // In a real app, this would update the artwork's status
    console.log(`Verifying artwork: ${artwork.title}`);
    // Would typically make an API call here
    onClose();
  };
  const handleUnverifyArtwork = () => {
    // In a real app, this would update the artwork's status
    console.log(`Unverifying artwork: ${artwork.title}`);
    // Would typically make an API call here
    onClose();
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Artwork image */}
            <div className="md:w-1/2">
              <div className="h-96 md:h-full overflow-hidden">
                <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Artwork details */}
            <div className="md:w-1/2 p-6">
              <div className="mb-4">
                {/* Status and price */}
                <div className="mb-4 flex justify-between items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${artwork.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {artwork.status}
                  </span>
                  <p className="text-xl font-semibold text-gray-900">
                    {artwork.price}
                  </p>
                </div>
                {/* Artist information */}
                <div className="space-y-1 mb-6">
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg text-gray-900">
                      {artwork.title}
                    </h3>
                  </div>
                  <p className="text-gray-800">
                    {artwork.artist} ({artwork.artistEmail})
                  </p>
                  <p className="text-gray-600">
                    {artwork.medium}, {artwork.year}
                  </p>
                  <p className="text-gray-600">{artworkDetails.dimensions}</p>
                </div>
              </div>
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-4">
                <nav className="-mb-px flex space-x-8">
                  <button onClick={() => setActiveTab('details')} className={`${activeTab === 'details' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}>
                    <InfoIcon className="h-5 w-5 mr-2" />
                    Details
                  </button>
                  <button onClick={() => setActiveTab('scans')} className={`${activeTab === 'scans' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}>
                    <QrCodeIcon className="h-5 w-5 mr-2" />
                    QR Scans
                    {qrCodeData && qrCodeData.scanHistory && qrCodeData.scanHistory.length > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800">
                          {qrCodeData.scanHistory.length}
                        </span>}
                  </button>
                </nav>
              </div>
              {activeTab === 'details' && <>
                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900">Description</h4>
                    <p className="mt-1 text-gray-600">
                      {artworkDetails.description}
                    </p>
                  </div>
                  {/* Additional details */}
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900">Provenance</h4>
                      <p className="mt-1 text-gray-600">
                        {artworkDetails.provenance}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Certificate of Authenticity
                      </h4>
                      <p className="mt-1 text-gray-600">
                        {artworkDetails.certificate ? 'Included' : 'Not available'}
                      </p>
                    </div>
                    {/* Exhibition History - only shown if there are entries */}
                    {artworkDetails.exhibitionHistory && artworkDetails.exhibitionHistory.length > 0 && <div>
                          <h4 className="font-medium text-gray-900">
                            Exhibition History
                          </h4>
                          <ul className="mt-1 text-gray-600 list-disc pl-5">
                            {artworkDetails.exhibitionHistory.map((exhibition, index) => <li key={index}>{exhibition}</li>)}
                          </ul>
                        </div>}
                  </div>
                  {/* Admin-specific information */}
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Admin Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Created</p>
                        <p className="font-medium">{artwork.createdDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Verified</p>
                        <p className="font-medium">
                          {artworkDetails.lastVerified}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Transfer Count</p>
                        <p className="font-medium">
                          {artworkDetails.transferCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">View Count</p>
                        <p className="font-medium">
                          {artworkDetails.viewCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">QR Code</p>
                        <p className="font-medium">{artworkDetails.qrCode}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">QR Scans</p>
                        <p className="font-medium">
                          {qrCodeData && qrCodeData.scanHistory ? qrCodeData.scanHistory.length : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </>}
              {activeTab === 'scans' && <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <QrCodeIcon className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="font-medium text-gray-900">
                      QR Code Scan History
                    </h4>
                  </div>
                  {qrCodeData && qrCodeData.scanHistory && qrCodeData.scanHistory.length > 0 ? <div className="bg-gray-50 rounded-md p-4 max-h-80 overflow-auto">
                      <ul className="divide-y divide-gray-200">
                        {qrCodeData.scanHistory.map((scan, index) => <li key={index} className="py-3">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-1">
                                <MapPinIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {scan.location}
                                </p>
                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                  <ClockIcon className="h-4 w-4 mr-1" />
                                  <span>{scan.timestamp}</span>
                                </div>
                                {scan.device && <div className="mt-1 flex items-center text-xs text-gray-500">
                                    <MonitorIcon className="h-4 w-4 mr-1" />
                                    <span>{scan.device}</span>
                                  </div>}
                                {scan.ipAddress && <div className="mt-1 text-xs text-gray-500">
                                    <span className="font-mono">
                                      IP: {scan.ipAddress}
                                    </span>
                                  </div>}
                              </div>
                            </div>
                          </li>)}
                      </ul>
                    </div> : <div className="bg-gray-50 rounded-md p-6 text-center">
                      <p className="text-gray-500">
                        No scan history available for this artwork
                      </p>
                      {qrCodeData ? <p className="mt-2 text-sm text-gray-400">
                          QR Code {qrCodeData.code} has not been scanned yet
                        </p> : <p className="mt-2 text-sm text-gray-400">
                          No QR code is associated with this artwork
                        </p>}
                    </div>}
                </div>}
              {/* Action buttons */}
              <div className="mt-8 flex space-x-3">
                {artwork.status !== 'Verified' ? <button onClick={handleVerifyArtwork} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Verify Artwork
                  </button> : <button onClick={handleUnverifyArtwork} className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-200 flex items-center justify-center">
                    <AlertTriangleIcon className="h-5 w-5 mr-2" />
                    Mark as Pending
                  </button>}
                <button onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
// Mock data for QR codes
const mockQRCodes = [{
  id: 1,
  code: 'ART-000001',
  name: 'Summer Exhibition 2023',
  status: 'registered',
  generatedDate: 'Jan 15, 2023',
  registeredDate: 'Feb 3, 2023',
  artwork: 'Sunset Dreams',
  owner: 'Sarah Chen',
  scanHistory: [{
    location: 'New York, United States',
    timestamp: 'May 12, 2023, 2:34 PM',
    ipAddress: '192.168.1.1',
    device: 'iPhone 13, iOS 16'
  }, {
    location: 'London, United Kingdom',
    timestamp: 'Jun 23, 2023, 11:15 AM',
    ipAddress: '192.168.1.2',
    device: 'Samsung Galaxy S22, Android 13'
  }, {
    location: 'Paris, France',
    timestamp: 'Jul 5, 2023, 4:22 PM',
    ipAddress: '192.168.1.3',
    device: 'Google Pixel 6, Android 13'
  }]
}, {
  id: 2,
  code: 'ART-000002',
  name: 'Summer Exhibition 2023',
  status: 'registered',
  generatedDate: 'Jan 15, 2023',
  registeredDate: 'Feb 10, 2023',
  artwork: 'Urban Reflections',
  owner: 'Sarah Chen',
  scanHistory: [{
    location: 'Los Angeles, United States',
    timestamp: 'Mar 3, 2023, 3:45 PM',
    ipAddress: '192.168.1.4',
    device: 'iPad Pro, iOS 16'
  }, {
    location: 'San Francisco, United States',
    timestamp: 'Apr 17, 2023, 1:12 PM',
    ipAddress: '192.168.1.5',
    device: 'MacBook Pro, macOS 13'
  }]
}, {
  id: 4,
  code: 'ART-000004',
  name: 'Winter Collection 2023',
  status: 'registered',
  generatedDate: 'Mar 5, 2023',
  registeredDate: 'Mar 20, 2023',
  artwork: 'Abstract Thoughts',
  owner: 'Marcus Rodriguez',
  scanHistory: [{
    location: 'Tokyo, Japan',
    timestamp: 'Apr 5, 2023, 9:30 AM',
    ipAddress: '192.168.1.6',
    device: 'iPhone 12 Mini, iOS 16'
  }]
}, {
  id: 5,
  code: 'ART-000005',
  name: 'Winter Collection 2023',
  status: 'registered',
  generatedDate: 'Mar 5, 2023',
  registeredDate: 'Apr 2, 2023',
  artwork: 'Coastal Serenity',
  owner: 'Emma Thompson',
  scanHistory: [{
    location: 'Sydney, Australia',
    timestamp: 'May 22, 2023, 10:15 AM',
    ipAddress: '192.168.1.7',
    device: 'Samsung Galaxy Tab S8, Android 13'
  }, {
    location: 'Melbourne, Australia',
    timestamp: 'Jun 14, 2023, 2:45 PM',
    ipAddress: '192.168.1.8',
    device: 'Google Chrome on Windows'
  }, {
    location: 'Brisbane, Australia',
    timestamp: 'Jul 3, 2023, 5:20 PM',
    ipAddress: '192.168.1.9',
    device: 'Safari on macOS'
  }, {
    location: 'Perth, Australia',
    timestamp: 'Jul 28, 2023, 11:05 AM',
    ipAddress: '192.168.1.10',
    device: 'Firefox on Windows'
  }]
}, {
  id: 8,
  code: 'ART-000008',
  name: 'Spring Showcase 2023',
  status: 'registered',
  generatedDate: 'Apr 10, 2023',
  registeredDate: 'Apr 15, 2023',
  artwork: 'Geometric Harmony',
  owner: 'Marcus Rodriguez',
  scanHistory: [{
    location: 'Berlin, Germany',
    timestamp: 'May 1, 2023, 3:40 PM',
    ipAddress: '192.168.1.11',
    device: 'Chrome on Android'
  }, {
    location: 'Munich, Germany',
    timestamp: 'May 15, 2023, 10:22 AM',
    ipAddress: '192.168.1.12',
    device: 'Safari on iOS'
  }]
}, {
  id: 9,
  code: 'ART-000009',
  name: 'Spring Showcase 2023',
  status: 'registered',
  generatedDate: 'Apr 10, 2023',
  registeredDate: 'Apr 22, 2023',
  artwork: 'Ethereal Landscape',
  owner: 'Sarah Chen',
  scanHistory: [{
    location: 'Toronto, Canada',
    timestamp: 'Jun 8, 2023, 4:15 PM',
    ipAddress: '192.168.1.13',
    device: 'Edge on Windows'
  }]
}];