import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: November 13, 2025</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using ApplyNHire (&quot;the Platform&quot;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
              <p className="text-muted-foreground">
                ApplyNHire provides an online platform that connects job seekers (Applicants) with employers (Companies, Agencies, and Clients). Our services include job posting, application management, candidate search, and related employment services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
              <p className="text-muted-foreground mb-2">
                To use certain features of the Platform, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept all responsibility for activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. User Conduct</h2>
              <p className="text-muted-foreground mb-2">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Post false, inaccurate, misleading, or fraudulent information</li>
                <li>Impersonate any person or entity</li>
                <li>Harass, threaten, or intimidate other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Use the Platform for any unauthorized commercial purposes</li>
                <li>Attempt to gain unauthorized access to the Platform or related systems</li>
                <li>Interfere with or disrupt the Platform&apos;s operation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Employer Responsibilities</h2>
              <p className="text-muted-foreground mb-2">Employers using the Platform agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Post only legitimate job opportunities</li>
                <li>Comply with all applicable employment laws and regulations</li>
                <li>Not discriminate based on protected characteristics</li>
                <li>Handle applicant data responsibly and in compliance with privacy laws</li>
                <li>Respond to applications in a timely and professional manner</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Applicant Responsibilities</h2>
              <p className="text-muted-foreground mb-2">Applicants using the Platform agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Provide truthful and accurate information in applications</li>
                <li>Not misrepresent qualifications or experience</li>
                <li>Respect employer intellectual property and confidential information</li>
                <li>Comply with all application instructions and requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Content and Intellectual Property</h2>
              <p className="text-muted-foreground">
                You retain ownership of content you post on the Platform. However, by posting content, you grant ApplyNHire a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content for the purpose of providing and promoting our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Privacy and Data Protection</h2>
              <p className="text-muted-foreground">
                Your use of the Platform is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Payment and Fees</h2>
              <p className="text-muted-foreground">
                ApplyNHire currently offers free job posting services. We reserve the right to introduce premium features and associated fees in the future. Any changes will be communicated to users in advance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your account at any time for violations of these Terms of Service, with or without notice. You may also terminate your account at any time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. ApplyNHire does not guarantee the accuracy, completeness, or reliability of any content or information on the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">12. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                ApplyNHire shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform. Our total liability shall not exceed the amount paid by you, if any, for using the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">13. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the Platform after changes are posted constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">14. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have questions about these Terms of Service, please contact us at support@applynhire.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
