'use client'

import React from 'react';
import { XIcon, CheckCircleIcon, XCircleIcon, UserIcon } from 'lucide-react';
type User = {
  id: number;
  name: string;
  email: string;
  status: string;
  artworksCount: number;
  joinedDate: string;
  avatar: string | null;
  bio?: string;
  location?: string;
  phone?: string;
  lastActive?: string;
};
type UserDetailModalProps = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
};
export const UserDetailModal = ({
  user,
  isOpen,
  onClose
}: UserDetailModalProps) => {
  // Early return if modal shouldn't be shown
  if (!isOpen || !user) return null;
  // Mock user additional details
  const userDetails = {
    bio: user.bio || 'Artist and creative professional based in San Francisco.',
    location: user.location || 'San Francisco, CA',
    phone: user.phone || '+1 (555) 123-4567',
    lastActive: user.lastActive || '2 days ago',
    registeredArtworks: user.artworksCount || 0,
    verifiedArtworks: Math.floor((user.artworksCount || 0) * 0.8),
    pendingArtworks: Math.floor((user.artworksCount || 0) * 0.2)
  };
  const handleStatusChange = (newStatus: string) => {
    // In a real app, this would update the user's status
    console.log(`Changing user ${user.name}'s status to ${newStatus}`);
    // Would typically make an API call here
    onClose();
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {user.avatar ? <img className="h-16 w-16 rounded-full" src={user.avatar} alt={user.name} /> : <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                        <UserIcon className="h-8 w-8 text-purple-600" />
                      </div>}
                  </div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="mt-1">
                      <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Location
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {userDetails.location}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {userDetails.phone}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Member since
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user.joinedDate}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Last active
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {userDetails.lastActive}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Bio</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {userDetails.bio}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Artwork Statistics
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 p-2 rounded-md">
                      <p className="text-lg font-medium text-gray-900">
                        {userDetails.registeredArtworks}
                      </p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-md">
                      <p className="text-lg font-medium text-green-700">
                        {userDetails.verifiedArtworks}
                      </p>
                      <p className="text-xs text-green-600">Verified</p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-md">
                      <p className="text-lg font-medium text-yellow-700">
                        {userDetails.pendingArtworks}
                      </p>
                      <p className="text-xs text-yellow-600">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {user.status === 'active' && <button type="button" onClick={() => handleStatusChange('suspended')} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                Suspend User
              </button>}
            {user.status === 'suspended' && <button type="button" onClick={() => handleStatusChange('active')} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                Reactivate User
              </button>}
            {user.status === 'pending' && <button type="button" onClick={() => handleStatusChange('active')} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                Approve User
              </button>}
            <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>;
};