// components/About.tsx - Enhanced version
import React from 'react';

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Resume Job Summarizer</h1>
        <p className="text-xl text-purple-100 max-w-2xl mx-auto">
          Transform your job applications with AI-powered resume optimization and personalized cover letters
        </p>
      </div>

      <div className="p-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400">Advanced AI analyzes your resume against job requirements</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Tailored Summaries</h3>
            <p className="text-gray-600 dark:text-gray-400">Get personalized summaries highlighting your best matches</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Cover Letters</h3>
            <p className="text-gray-600 dark:text-gray-400">Generate professional cover letters automatically</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Paste Your Content", desc: "Add your resume text and the job description" },
              { step: 2, title: "AI Analysis", desc: "Our AI analyzes and matches your qualifications" },
              { step: 3, title: "Get Results", desc: "Receive tailored summaries and cover letters" }
            ].map((item) => (
              <div key={item.step} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Benefits</h2>
            <ul className="space-y-3">
              {[
                "Save hours of manual resume tailoring",
                "Increase ATS compatibility",
                "Highlight relevant skills automatically",
                "Generate professional cover letters",
                "Improve application success rates"
              ].map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Your Data is Safe</h3>
                  <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                    We don't store your resume or job descriptions. All processing happens in real-time and data is discarded after your session.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
