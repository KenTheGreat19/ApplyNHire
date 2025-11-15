export const metadata = {
  title: "Frequently Asked Questions - ApplyNHire",
  description: "Answers to the most common ApplyNHire questions",
}

const faqs = [
  {
    question: "Is ApplyNHire really free for employers and applicants?",
    answer: "Yes. Posting jobs, managing applicants, and applying for roles are all 100% free. Optional upgrades such as sponsored listings are clearly marked before purchase.",
  },
  {
    question: "How long does it take for my job post to go live?",
    answer: "Most posts are published instantly. Listings that trigger our safety review process are approved within one business day, and we email you once the job is live.",
  },
  {
    question: "Can I invite teammates to help manage hiring?",
    answer: "Absolutely. Employer admins can add unlimited collaborators from the Users page, assign custom permissions, and remove access at any time.",
  },
  {
    question: "How do applicants contact employers?",
    answer: "Applicants can send messages directly through ApplyNHire once they apply. You can also enable the option to redirect candidates to your own careers portal.",
  },
  {
    question: "Where can I get help if something breaks?",
    answer: "Reach out via the Contact page or email support@applynhire.com. Our team typically replies in under 24 hours on business days.",
  },
]

export default function FAQPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wide text-blue-600">Help center</p>
          <h1 className="mt-2 text-3xl font-bold">Frequently asked questions</h1>
          <p className="mt-4 text-muted-foreground">
            Quick answers to the most common questions from candidates and hiring teams.
          </p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{faq.question}</h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
