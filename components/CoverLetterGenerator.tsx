'use client';

import { useState } from 'react';

interface CoverLetterGeneratorProps {
  summary: string;
  resume: string;
  jobDescription: string;
}

export default function CoverLetterGenerator({ summary, resume, jobDescription }: CoverLetterGeneratorProps) {
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
  });

  const generateCoverLetter = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary,
          resume,
          jobDescription,
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setCoverLetter(data.coverLetter);
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-blue-600 px-8 py-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white">Cover Letter Generator</h2>
        <p className="text-purple-100">Create a personalized cover letter</p>
      </div>

      <div className="p-8">
        {!coverLetter ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 md:col-span-2"
              />
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={generateCoverLetter}
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-700 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Generating...' : 'Generate Cover Letter'}
            </button>
          </>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Your Cover Letter</h3>
              <div className="space-x-2">
                <button
                  onClick={() => navigator.clipboard.writeText(coverLetter)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Copy
                </button>
                <button
                  onClick={() => setCoverLetter('')}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg whitespace-pre-wrap font-serif">
              {coverLetter}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
