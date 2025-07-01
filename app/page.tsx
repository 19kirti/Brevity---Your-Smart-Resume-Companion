import About from "@/components/About";
import CoverLetterGenerator from "@/components/CoverLetterGenerator";
import ResumeJobUploader from "@/components/ResumeJobUploader";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-10">
      <div className="max-w-7xl w-full">
        <About/>
        <ResumeJobUploader/>
        <CoverLetterGenerator summary={""} resume={""} jobDescription={""}/>
        </div>
        </main>
  );
}
