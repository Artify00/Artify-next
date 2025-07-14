
'use client'

import React, { useEffect, useState } from 'react';
import { XIcon, ClockIcon } from 'lucide-react';
import { TransferOwnershipModal } from './TransferOwnershipModal';
import { TransferHistoryModal } from './TransferHistoryModal';
type Artwork = {
  id: number;
  title: string;
  image: string;
  medium: string;
  year: number;
  status: string;
  price: string;
  description?: string;
  artist?: string;
  dimensions?: string;
  provenance?: string;
  certificate?: boolean;
  exhibitionHistory?: string[];
};
type ArtworkDetailModalProps = {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
};
export const ArtworkDetailModal = ({
  artwork,
  isOpen,
  onClose
}: ArtworkDetailModalProps) => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showTransferHistoryModal, setShowTransferHistoryModal] = useState(false);
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  // Early return if modal shouldn't be shown
  if (!isOpen || !artwork) return null;
  // Move artwork details inside the component AFTER the early return check
  const getArtworkDetails = (artwork: Artwork) => ({
    description: "This piece explores the interplay between light and shadow, creating a dynamic visual experience that changes with the viewer's perspective.",
    artist: artwork.id % 2 === 0 ? 'Sarah Chen' : 'Guest Artist',
    dimensions: `${30 + artwork.id * 5}cm × ${40 + artwork.id * 3}cm`,
    provenance: 'Original creation, first registered in 2023',
    certificate: true,
    exhibitionHistory: artwork.id % 3 === 0 ? ['Contemporary Art Gallery, New York, 2023', 'International Art Fair, London, 2022'] : []
  });
  const artworkDetails = getArtworkDetails(artwork);
  const handleTransferClick = () => {
    setShowTransferModal(true);
  };
  const handleTransferModalClose = () => {
    setShowTransferModal(false);
  };
  const handleTransferHistoryClick = () => {
    setShowTransferHistoryModal(true);
  };
  const handleTransferHistoryModalClose = () => {
    setShowTransferHistoryModal(false);
  };
  return <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
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
                  {/* Consolidated caption information */}
                  <div className="space-y-1 mb-6">
                    <p className="font-bold text-lg text-gray-900">
                      {artworkDetails.artist}
                    </p>
                    <p className="text-gray-800">
                      {artwork.title}, {artwork.year}
                    </p>
                    <p className="text-gray-600">{artwork.medium}</p>
                    <p className="text-gray-600">{artworkDetails.dimensions}</p>
                  </div>
                </div>
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
                <div className="mt-8 flex space-x-3">
                  <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200">
                    Consign this Work
                  </button>
                  <button className="flex-1 border border-purple-600 text-purple-600 py-2 px-4 rounded-md hover:bg-purple-50 transition duration-200" onClick={handleTransferClick}>
                    Transfer Ownership
                  </button>
                </div>
                <button onClick={handleTransferHistoryClick} className="mt-4 flex items-center text-sm text-purple-600 hover:text-purple-800">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  View Ownership Transfer History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Transfer Ownership Modal */}
      <TransferOwnershipModal isOpen={showTransferModal} onClose={handleTransferModalClose} artworkTitle={artwork.title} />
      {/* Transfer History Modal */}
      <TransferHistoryModal isOpen={showTransferHistoryModal} onClose={handleTransferHistoryModalClose} />
    </>;
};