// app/api/process-files/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get('resume') as File;
    const jobFile = formData.get('jobDescription') as File;

    if (!resumeFile || !jobFile) {
      return NextResponse.json(
        { error: 'Both files are required' },
        { status: 400 }
      );
    }

    // Convert files to base64 for Gemini Vision API
    const resumeBuffer = await resumeFile.arrayBuffer();
    const jobBuffer = await jobFile.arrayBuffer();
    
    const resumeBase64 = Buffer.from(resumeBuffer).toString('base64');
    const jobBase64 = Buffer.from(jobBuffer).toString('base64');

    // Use Gemini Vision model for image/PDF processing
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Extract text from these two documents and create a tailored summary:
      
      Document 1 (Resume): Please extract all text content from this resume.
      Document 2 (Job Description): Please extract all text content from this job description.
      
      After extracting the text, provide a tailored summary (300-500 words) that:
      1. Highlights the most relevant skills and experiences from the resume that match the job requirements
      2. Identifies key strengths that align with the position
      3. Suggests how to position the candidate as ideal for this role
      4. Uses professional language appropriate for job applications
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: resumeBase64,
          mimeType: resumeFile.type
        }
      },
      {
        inlineData: {
          data: jobBase64,
          mimeType: jobFile.type
        }
      }
    ]);

    const summary = result.response.text();

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error('Error processing files:', error);
    return NextResponse.json(
      { error: 'Failed to process files' },
      { status: 500 }
    );
  }
}
