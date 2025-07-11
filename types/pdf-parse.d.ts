// Create a new file: types/pdf-parse.d.ts
declare module 'pdf-parse' {
    function pdfParse(dataBuffer: Buffer, options?: any): Promise<{
      numpages: number;
      numrender: number;
      info: any;
      metadata: any;
      text: string;
      version: string;
    }>;
    
    export = pdfParse;
  }
  