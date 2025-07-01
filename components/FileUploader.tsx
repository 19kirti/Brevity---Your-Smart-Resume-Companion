// components/FileUploader.tsx
'use client';

import { useState } from 'react';

export default function FileUploader() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobFile, setJobFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'job') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'resume') {
      setResumeFile(file);
    } else {
      setJobFile(file);
    }
  };

  const generateSummary = async () => {
    if (!resumeFile || !jobFile) {
      setError('Please upload both resume and job description files');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobFile);

    try {
      const response = await fetch('/api/process-files', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary);
      setActiveStep(2);
    } catch (err) {
      setError('Failed to process files. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResumeFile(null);
    setJobFile(null);
    setSummary('');
    setError(null);
    setActiveStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 my-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center ${activeStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 my-8 font-medium">Upload Files</span>
            </div>
            <div className={`w-16 h-1 ${activeStep >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${activeStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">AI Analysis</span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-blue-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">Document Upload & Analysis</h1>
            <p className="text-green-100 text-center mt-2">Upload your resume and job description for AI-powered analysis</p>
          </div>

          <div className="p-8">
            {/* Upload Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Resume Upload */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">Resume Upload</label>
                </div>
                
                <div className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
                  resumeFile 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                }`}>
                  <label className="cursor-pointer block text-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'resume')}
                    />
                    {resumeFile ? (
                      <div className="space-y-3">
                        <svg className="mx-auto h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-lg font-medium text-green-800 dark:text-green-200">{resumeFile.name}</p>
                          <p className="text-sm text-green-600 dark:text-green-400">File uploaded successfully</p>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              setResumeFile(null);
                            }}
                            className="text-xs text-red-500 mt-2 hover:underline"
                          >
                            Remove file
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div>
                          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Upload Resume</p>
                          <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG, TXT files up to 10MB</p>
                          <p className="text-xs text-green-600 mt-2">Click to browse files</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Job Description Upload */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">Job Description Upload</label>
                </div>
                
                <div className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
                  jobFile 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}>
                  <label className="cursor-pointer block text-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'job')}
                    />
                    {jobFile ? (
                      <div className="space-y-3">
                        <svg className="mx-auto h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-lg font-medium text-blue-800 dark:text-blue-200">{jobFile.name}</p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">File uploaded successfully</p>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              setJobFile(null);
                            }}
                            className="text-xs text-red-500 mt-2 hover:underline"
                          >
                            Remove file
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Upload Job Description</p>
                          <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG, TXT files up to 10MB</p>
                          <p className="text-xs text-blue-600 mt-2">Click to browse files</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="ml-3 text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={generateSummary}
                disabled={!resumeFile || !jobFile || isLoading}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                  !resumeFile || !jobFile || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-700 to-blue-600 text-white hover:from-green-800 hover:to-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Documents...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Analyze Documents
                  </>
                )}
              </button>
            </div>

            {/* Summary Display */}
            {summary && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-green-200 dark:border-gray-500">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                    <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    AI-Generated Summary
                  </h2>
                  <button 
                    onClick={resetForm}
                    className="px-4 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
                <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner">
                  {summary.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
