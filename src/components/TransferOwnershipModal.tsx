'use client'

import React, { useState } from 'react';
import { XIcon, CheckIcon, AlertCircleIcon, InfoIcon } from 'lucide-react';
type TransferOwnershipModalProps = {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
};
// Common country codes for the dropdown
const countryCodes = [{
  code: '+1',
  country: 'US/CA'
}, {
  code: '+44',
  country: 'UK'
}, {
  code: '+61',
  country: 'AU'
}, {
  code: '+33',
  country: 'FR'
}, {
  code: '+49',
  country: 'DE'
}, {
  code: '+81',
  country: 'JP'
}, {
  code: '+86',
  country: 'CN'
}, {
  code: '+91',
  country: 'IN'
}, {
  code: '+52',
  country: 'MX'
}, {
  code: '+55',
  country: 'BR'
}];
export const TransferOwnershipModal = ({
  isOpen,
  onClose,
  artworkTitle
}: TransferOwnershipModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'form' | 'confirm' | 'verification' | 'success'>('form');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    countryCode?: string;
  }>({});
  // Early return if modal shouldn't be shown
  if (!isOpen) return null;
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      countryCode?: string;
    } = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!countryCode.trim()) {
      newErrors.countryCode = 'Country code is required';
    } else if (!/^\+\d{1,4}$/.test(countryCode)) {
      newErrors.countryCode = 'Invalid country code';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{6,15}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (6-15 digits)';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!/^\d{6}$/.test(password)) {
      newErrors.password = 'Password must be a 6-digit number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Move to confirmation step
      setStep('confirm');
    }
  };
  const handleConfirm = () => {
    // Mock sending email and text message
    console.log(`Sending email to ${email} about transfer of "${artworkTitle}"`);
    console.log(`Sending verification code to ${countryCode} ${phone}`);
    // Move to verification step
    setStep('verification');
  };
  const handleVerify = () => {
    // In a real app, we would verify the code here
    // For demo purposes, we'll just move to success
    setStep('success');
  };
  const formatPhoneNumber = (phoneNumber: string, code: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    // For US/CA format
    if (code === '+1' && cleaned.length === 10) {
      return `${code} (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    // Generic format for other countries
    return `${code} ${cleaned}`;
  };
  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Ensure the "+" is always at the beginning
    if (!value.startsWith('+')) {
      value = '+' + value.replace(/\D/g, '');
    } else {
      // Keep the "+" and only allow digits after it
      value = '+' + value.substring(1).replace(/\D/g, '');
    }
    setCountryCode(value);
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
            {step === 'form' && <>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Transfer Ownership of "{artworkTitle}"
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Please provide the new owner's details. We'll send
                  verification messages to complete the transfer.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      New Owner's Name
                    </label>
                    <input type="text" id="name" className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`} value={name} onChange={e => setName(e.target.value)} />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input type="email" id="email" className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`} value={email} onChange={e => setEmail(e.target.value)} />
                    {errors.email && <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex">
                      <input type="text" id="countryCode" className={`w-20 px-3 py-2 border ${errors.countryCode ? 'border-red-500' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600`} value={countryCode} onChange={handleCountryCodeChange} maxLength={5} />
                      <input type="tel" id="phone" className={`flex-1 px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-600`} placeholder="Phone number" value={phone} onChange={e => {
                    // Only allow digits, spaces, and hyphens
                    const value = e.target.value.replace(/[^\d\s-]/g, '');
                    setPhone(value);
                  }} />
                    </div>
                    {errors.countryCode && <p className="mt-1 text-xs text-red-500">
                        {errors.countryCode}
                      </p>}
                    {errors.phone && <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Create 6-Digit Password
                    </label>
                    <input type="password" id="password" className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`} maxLength={6} placeholder="6-digit number" value={password} onChange={e => {
                  // Only allow digits
                  const value = e.target.value.replace(/\D/g, '');
                  setPassword(value);
                }} />
                    {errors.password && <p className="mt-1 text-xs text-red-500">
                        {errors.password}
                      </p>}
                    <p className="mt-1 text-xs text-gray-500">
                      This password will be sent to the new owner's phone number
                      for verification
                    </p>
                  </div>
                  <div className="mt-6">
                    <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200">
                      Continue
                    </button>
                  </div>
                </form>
              </>}
            {step === 'confirm' && <div className="py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                  <InfoIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                  Confirm Transfer Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Artwork</p>
                    <p className="text-sm font-semibold">{artworkTitle}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">
                      New Owner
                    </p>
                    <p className="text-sm font-semibold">{name}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm font-semibold">{email}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm font-semibold">
                      {formatPhoneNumber(phone, countryCode)}
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Once initiated, this transfer
                    will require verification by the new owner. You will no
                    longer be the registered owner of this artwork once the
                    transfer is complete.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button type="button" onClick={() => setStep('form')} className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200">
                    Back
                  </button>
                  <button type="button" onClick={handleConfirm} className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200">
                    Initiate Transfer
                  </button>
                </div>
              </div>}
            {step === 'verification' && <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                  <AlertCircleIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Verification Sent
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  We've sent an email to{' '}
                  <span className="font-medium">{email}</span> and a
                  verification code to{' '}
                  <span className="font-medium">
                    {formatPhoneNumber(phone, countryCode)}
                  </span>
                  .
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  The new owner will need to enter the 6-digit password you
                  created to complete the transfer.
                </p>
                <button type="button" onClick={handleVerify} className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200">
                  Simulate Verification (Demo)
                </button>
              </div>}
            {step === 'success' && <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <CheckIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Transfer Initiated
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  The ownership transfer process has been initiated. Once the
                  new owner verifies their identity, the transfer will be
                  complete.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-6 text-left">
                  <p className="text-sm text-blue-800">
                    <strong>What happens next:</strong>
                  </p>
                  <ul className="text-sm text-blue-800 list-disc pl-5 mt-1">
                    <li>The new owner will receive instructions via email</li>
                    <li>
                      They will need to enter the 6-digit password you created
                    </li>
                    <li>
                      Once verified, the transfer will be recorded in our secure
                      database
                    </li>
                    <li>
                      You'll receive a confirmation when the process is complete
                    </li>
                  </ul>
                </div>
                <button type="button" onClick={onClose} className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200">
                  Close
                </button>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};