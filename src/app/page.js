'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios'; 

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {

      const response = await axios.post('/api/contact', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data; 
      
      if (result.status === 'success') {
        toast.success('🎉 Lead submitted successfully!', {
          icon: '✅',
          duration: 5000
        });
        reset();
      } else {
        toast.error('Failed to submit lead');
      }
    } catch (error) {
     
      if (error.response?.status === 400) {
        toast.error('Invalid data. Please check your inputs.');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Lead Capture
          </h1>
          <p className="text-gray-600">Submit your details to get started</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:shadow-lg"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

         
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-4 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:shadow-lg"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

           
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                className="w-full px-4 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:shadow-lg"
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

           
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Property Value
              </label>
              <input
                {...register('propertyValue', { required: 'Property value is required' })}
                className="w-full px-4 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:shadow-lg"
                placeholder="$500,000"
              />
              {errors.propertyValue && (
                <p className="mt-1 text-sm text-red-500">{errors.propertyValue.message}</p>
              )}
            </div>

           
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Monthly Salary
              </label>
              <input
                {...register('monthlySalary', { required: 'Monthly salary is required' })}
                className="w-full px-4 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:shadow-lg"
                placeholder="$8,000"
              />
              {errors.monthlySalary && (
                <p className="mt-1 text-sm text-red-500">{errors.monthlySalary.message}</p>
              )}
            </div>

          
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 px-6 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-6 h-6 animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="sr-only">Submitting...</span>
                </>
              ) : (
                'Submit Lead'
              )}
            </button>
          </form>

      
          
          </div>
        </div>
      </div>
    </div>
  );
}
