// app/cover-letter/page.tsx
import CoverLetterGenerator from "@/components/CoverLetterGenerator";
import CoverLetterPage from "@/components/CoverLetterGenerator";
import Layout from "@/components/Layout";

export default function CoverLetterPageRoute() {
  return (
    <Layout>
      <CoverLetterGenerator summary={""} resume={""} jobDescription={""}/>
    </Layout>
  );
}
