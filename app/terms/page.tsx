import Link from "next/link";
import Footer from "../components/Footer";

export const metadata = { title: "Terms & Conditions | HireVexa" };

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using HireVexa's platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform.`
  },
  {
    title: "2. Eligibility",
    content: `HireVexa's services are intended for individuals who are 18 years of age or older and are seeking employment or career guidance in India. By using our platform, you confirm that you meet these eligibility requirements and that all information you provide is accurate and truthful.`
  },
  {
    title: "3. User Accounts",
    content: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately if you suspect any unauthorised use of your account. HireVexa reserves the right to suspend or terminate accounts that violate these terms.`
  },
  {
    title: "4. Our Services",
    content: `HireVexa provides career placement assistance, resume building, interview preparation, and job matching services. While we strive to match candidates with suitable opportunities, we do not guarantee employment or placement. Our services are designed to facilitate connections between candidates and employers, and placement outcomes depend on multiple factors.`
  },
  {
    title: "5. User Conduct",
    content: `You agree not to use HireVexa for any unlawful purpose, to provide false or misleading information, to impersonate any person or entity, to interfere with the proper functioning of the platform, or to attempt to gain unauthorised access to any part of our systems. Violation of these rules may result in immediate account termination.`
  },
  {
    title: "6. Fees and Payments",
    content: `Registration on HireVexa is free. Certain premium services, such as specific skill courses, may be subject to fees. All fees will be clearly communicated before any purchase. We do not charge placement fees — we never deduct any amount from your salary after you get placed. Payments for courses are non-refundable unless the course content is inaccessible due to a technical error on our end.`
  },
  {
    title: "7. Intellectual Property",
    content: `All content on HireVexa, including text, graphics, logos, and course materials, is the property of HireVexa Consultancy and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.`
  },
  {
    title: "8. Limitation of Liability",
    content: `HireVexa shall not be liable for any indirect, incidental, or consequential damages arising from your use of our platform. We do not guarantee the accuracy of job listings or employer information. Our total liability to you for any claims shall not exceed the amount you paid us in the three months preceding the claim.`
  },
  {
    title: "9. Third-Party Links",
    content: `Our platform may contain links to third-party websites. We are not responsible for the content or privacy practices of these external sites. Accessing them is at your own risk.`
  },
  {
    title: "10. Termination",
    content: `We reserve the right to terminate or suspend your access to HireVexa at any time, with or without cause, if we believe you have violated these Terms. You may also terminate your account at any time by contacting our support team.`
  },
  {
    title: "11. Governing Law",
    content: `These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Delhi, India.`
  },
  {
    title: "12. Changes to Terms",
    content: `HireVexa reserves the right to modify these Terms at any time. We will notify users of material changes via email or platform notification. Continued use of our services after such modifications constitutes your acceptance of the updated terms.`
  },
  {
    title: "13. Contact",
    content: `If you have any questions about these Terms and Conditions, please contact us at hirevexaconsultancy01@gmail.com.`
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#1a2332] to-[#232F3E] text-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#FF9900] text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-400 text-sm">Last updated: June 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-[#fff8e8] border border-[#FFD814]/50 rounded-2xl p-5 mb-10">
          <p className="text-sm text-gray-700 leading-relaxed">
            Please read these Terms and Conditions carefully before using HireVexa's platform. These terms govern your use of our website, services, and content. By using HireVexa, you agree to these terms in full.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-sm text-[#FF9900] hover:underline font-semibold">← Back to Home</Link>
          <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-900">View Privacy Policy →</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}