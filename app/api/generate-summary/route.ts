// app/api/generate-summary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription } = await request.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume and job description are required' },
        { status: 400 }
      );
    }

    // Clean and sanitize the text
    const cleanResume = sanitizeText(resume);
    const cleanJobDescription = sanitizeText(jobDescription);

    // Create a prompt for the Gemini API
    const prompt = `
      I have a resume and a job description. I need a tailored summary that highlights how my experience and skills match the job requirements.
      
      Resume:
      ${cleanResume}
      
      Job Description:
      ${cleanJobDescription}
      
      Please provide a concise summary (around 300-500 words) that:
      1. Highlights the most relevant skills and experiences from my resume that match the job requirements
      2. Identifies key strengths that align with the position
      3. Suggests how to position myself as an ideal candidate for this role
      4. Uses professional language appropriate for job applications
    `;

    // Get the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    });

    // Call the Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate summary' },
      { status: 500 }
    );
  }
}

// Helper function to clean and sanitize text
function sanitizeText(text: string): string {
  // Remove any non-printable characters
  let cleaned = text.replace(/[^\x20-\x7E\n\r\t]/g, '');
  
  // Remove excessive whitespace
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  // Limit length if needed (Gemini might have token limits)
  const maxLength = 10000; // Adjust based on model limits
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength) + '... [content truncated due to length]';
  }
  
  return cleaned;
}
