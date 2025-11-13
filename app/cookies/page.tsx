import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CookiePolicyPage() {
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
            <CardTitle className="text-3xl">Cookie Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: November 13, 2025</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. What Are Cookies</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. How We Use Cookies</h2>
              <p className="text-muted-foreground">
                ApplyNHire uses cookies to enhance your experience, understand how you use our Platform, and improve our services. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted or expired).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold mb-2 mt-4">3.1 Essential Cookies</h3>
              <p className="text-muted-foreground">
                These cookies are necessary for the Platform to function properly. They enable core functionality such as security, authentication, and accessibility. Without these cookies, certain services cannot be provided.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                <li>Authentication and login session management</li>
                <li>Security and fraud prevention</li>
                <li>Load balancing and performance</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">3.2 Functional Cookies</h3>
              <p className="text-muted-foreground">
                These cookies allow the Platform to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                <li>Remembering your preferences and settings</li>
                <li>Storing your search and filter criteria</li>
                <li>Maintaining your session across pages</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">3.3 Analytics and Performance Cookies</h3>
              <p className="text-muted-foreground">
                These cookies help us understand how visitors interact with our Platform by collecting and reporting information anonymously. This helps us improve our website and services.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                <li>Tracking page visits and user behavior</li>
                <li>Measuring website performance and load times</li>
                <li>Understanding which features are most popular</li>
                <li>Identifying errors and technical issues</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">3.4 Advertising and Marketing Cookies</h3>
              <p className="text-muted-foreground">
                These cookies are used to deliver relevant advertisements and marketing messages. They also help us measure the effectiveness of our advertising campaigns.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                <li>Showing relevant ads based on your interests</li>
                <li>Limiting the number of times you see an ad</li>
                <li>Measuring ad campaign effectiveness</li>
                <li>Remarketing to previous visitors</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-2">
                We may use third-party service providers who set cookies on our Platform. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Google Analytics:</strong> To analyze website usage and performance</li>
                <li><strong>Google OAuth:</strong> For authentication and sign-in services</li>
                <li><strong>Yahoo OAuth:</strong> For authentication and sign-in services</li>
                <li><strong>Microsoft OAuth:</strong> For authentication and sign-in services</li>
                <li><strong>Social Media Platforms:</strong> For sharing and integration features</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                These third parties have their own privacy policies and cookie policies, which we encourage you to review.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Managing Cookies</h2>
              
              <h3 className="text-xl font-semibold mb-2 mt-4">5.1 Browser Settings</h3>
              <p className="text-muted-foreground">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Clear cookies when you close your browser</li>
                <li>Delete existing cookies</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                Please note that blocking or deleting cookies may affect your ability to use certain features of our Platform.
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">5.2 Browser-Specific Instructions</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
                <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy & Security &gt; Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data</li>
                <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions &gt; Manage cookies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">5.3 Opt-Out Tools</h3>
              <p className="text-muted-foreground">
                You can opt-out of certain advertising cookies through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                <li>Google Analytics Opt-out Browser Add-on</li>
                <li>Network Advertising Initiative (NAI) opt-out page</li>
                <li>Digital Advertising Alliance (DAA) opt-out page</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Cookie Lifespan</h2>
              <p className="text-muted-foreground">
                Different cookies have different lifespans:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain on your device for a set period (typically 30 days to 2 years)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Do Not Track Signals</h2>
              <p className="text-muted-foreground">
                Some browsers have a &quot;Do Not Track&quot; feature that lets you tell websites you do not want to have your online activities tracked. Currently, our Platform does not respond to Do Not Track signals, as there is no universal standard for how to respond to such signals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Updates to This Cookie Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <p className="text-muted-foreground mt-2">
                Email: privacy@applynhire.com<br />
                Subject: Cookie Policy Inquiry
              </p>
            </section>

            <section className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">
                <strong>Note:</strong> By continuing to use our Platform, you consent to our use of cookies as described in this Cookie Policy and our Privacy Policy. If you do not agree with our use of cookies, please adjust your browser settings or discontinue using our Platform.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
