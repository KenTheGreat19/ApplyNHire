export const metadata = {
  title: "Security at ApplyNHire",
  description: "Learn how we keep employer and applicant data safe",
}

const pillars = [
  {
    title: "Data encryption",
    details: "All traffic is protected with TLS 1.2+, and sensitive data at rest is encrypted using AES-256.",
  },
  {
    title: "Access controls",
    details: "Role-based permissions let you decide who can view applications, edit jobs, or export reports.",
  },
  {
    title: "Compliance & retention",
    details: "We follow GDPR/CCPA guidelines, honor data subject requests, and retain applicant data only as long as necessary.",
  },
]

const bestPractices = [
  "Require two-factor authentication for every admin user.",
  "Review the Users page quarterly to remove stale accounts.",
  "Use unique email aliases per hiring team to track activity.",
]

export default function SecurityPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-16 max-w-5xl space-y-12">
        <header className="text-center space-y-4">
          <p className="text-sm uppercase tracking-wide text-blue-600">Trust & safety</p>
          <h1 className="text-3xl font-bold">Security at ApplyNHire</h1>
          <p className="text-muted-foreground">
            ApplyNHire protects millions of candidate profiles and employer records with enterprise-grade safeguards.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-xl font-semibold mb-2">{pillar.title}</h2>
              <p className="text-sm text-muted-foreground">{pillar.details}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-blue-50 dark:bg-blue-950/20 p-8">
          <h2 className="text-2xl font-semibold mb-3">Best practices for hiring teams</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Keep your workspace safe with these quick wins.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {bestPractices.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className="text-center">
          <p className="text-sm text-muted-foreground">Need to report an incident? Email security@applynhire.com and our on-call team will respond within 24 hours.</p>
        </section>
      </div>
    </div>
  )
}
