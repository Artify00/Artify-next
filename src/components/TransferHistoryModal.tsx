
'use client'

import React from 'react';
import { XIcon, ArrowRightIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
type Transfer = {
  id: number;
  artworkTitle: string;
  artworkImage: string;
  fromUser: string;
  toUser: string;
  date: string;
  status: 'completed' | 'pending';
};
type TransferHistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const TransferHistoryModal = ({
  isOpen,
  onClose
}: TransferHistoryModalProps) => {
  // Early return if modal shouldn't be shown
  if (!isOpen) return null;
  // Mock transfer history data
  const transfers: Transfer[] = [{
    id: 1,
    artworkTitle: 'Sunset Dreams',
    artworkImage: "/canvas_back.jpg",
    fromUser: 'Sarah Chen',
    toUser: 'Marcus Rodriguez',
    date: 'June 15, 2023',
    status: 'completed'
  }, {
    id: 2,
    artworkTitle: 'Urban Reflections',
    artworkImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fromUser: 'Sarah Chen',
    toUser: 'Emma Thompson',
    date: 'May 28, 2023',
    status: 'completed'
  }, {
    id: 3,
    artworkTitle: 'Geometric Harmony',
    artworkImage: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fromUser: 'Sarah Chen',
    toUser: 'Alex Johnson',
    date: 'Today',
    status: 'pending'
  }];
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
              Ownership Transfer History
            </h3>
            {transfers.length === 0 ? <div className="text-center py-8">
                <p className="text-gray-500">No transfer history found.</p>
              </div> : <div className="space-y-6">
                {transfers.map(transfer => <div key={transfer.id} className="flex border rounded-lg overflow-hidden">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img src={transfer.artworkImage} alt={transfer.artworkTitle} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {transfer.artworkTitle}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span>{transfer.fromUser}</span>
                            <ArrowRightIcon className="h-3 w-3 mx-2" />
                            <span>{transfer.toUser}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {transfer.status === 'completed' ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                              Completed
                            </span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Pending
                            </span>}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {transfer.date}
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={onClose} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>;
};