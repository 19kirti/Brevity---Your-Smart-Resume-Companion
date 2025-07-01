// app/api/generate-cover-letter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { summary, resume, jobDescription, fullName, email, phone, companyName, jobTitle } = await request.json();

    const prompt = `
      Write a professional cover letter using this information:
      
      Summary: ${summary || ''}
      Resume: ${resume}
      Job Description: ${jobDescription}
      
      Personal Details:
      Name: ${fullName || '[Your Name]'}
      Email: ${email || '[Your Email]'}
      Phone: ${phone || '[Your Phone]'}
      Company: ${companyName || '[Company Name]'}
      Position: ${jobTitle || '[Job Title]'}
      
      Create a professional cover letter with proper formatting, highlighting relevant experience and skills.
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      }
    });

    const result = await model.generateContent(prompt);
    const coverLetter = result.response.text();

    return NextResponse.json({ coverLetter });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}
