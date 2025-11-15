"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Search,
  Briefcase,
  Users,
  FileText,
  Settings,
  HelpCircle,
  MessageSquare,
  ChevronRight
} from "lucide-react"
import { useState } from "react"

const helpCategories = [
  {
    title: "Getting Started",
    icon: Briefcase,
    articles: [
      { title: "How to post your first job", href: "#post-job" },
      { title: "Setting up your employer profile", href: "#setup-profile" },
      { title: "Understanding the dashboard", href: "#dashboard" },
      { title: "Navigation guide", href: "#navigation" }
    ]
  },
  {
    title: "Managing Jobs",
    icon: FileText,
    articles: [
      { title: "Edit or delete job postings", href: "#edit-jobs" },
      { title: "Job status and visibility", href: "#job-status" },
      { title: "Using job tags effectively", href: "#job-tags" },
      { title: "Featuring jobs", href: "#featured-jobs" }
    ]
  },
  {
    title: "Managing Candidates",
    icon: Users,
    articles: [
      { title: "Viewing applications", href: "#view-applications" },
      { title: "Searching for talent", href: "#search-talent" },
      { title: "Managing interviews", href: "#interviews" },
      { title: "Candidate communication", href: "#communication" }
    ]
  },
  {
    title: "Account Settings",
    icon: Settings,
    articles: [
      { title: "Update account information", href: "#account-info" },
      { title: "Team member management", href: "#team-members" },
      { title: "Notification preferences", href: "#notifications" },
      { title: "Security settings", href: "#security" }
    ]
  }
]

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <Link href="/employer/contact">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contact
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A66C2] mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Find answers and get help with your employer account
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/employer/contact">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary">
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-[#0A66C2]" />
                <h3 className="font-semibold text-lg mb-2">Contact Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get help from our support team
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/employer/hiring-guide">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary">
              <CardContent className="pt-6 text-center">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-[#0A66C2]" />
                <h3 className="font-semibold text-lg mb-2">Hiring Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Best practices for hiring
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/employer/community">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary">
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-[#0A66C2]" />
                <h3 className="font-semibold text-lg mb-2">Community Forum</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with other employers
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {helpCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-[#0A66C2]" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.articles.map((article) => (
                      <Link key={article.title} href={article.href}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <span className="text-left">{article.title}</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Popular Articles */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#0A66C2]" />
                Popular Articles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-b pb-3">
                <h4 className="font-semibold mb-1">How to attract top talent?</h4>
                <p className="text-sm text-muted-foreground">
                  Learn strategies to make your job postings stand out and attract qualified candidates.
                </p>
              </div>
              <div className="border-b pb-3">
                <h4 className="font-semibold mb-1">What makes a great job description?</h4>
                <p className="text-sm text-muted-foreground">
                  Tips for writing clear, compelling job descriptions that get results.
                </p>
              </div>
              <div className="border-b pb-3">
                <h4 className="font-semibold mb-1">How to schedule interviews efficiently?</h4>
                <p className="text-sm text-muted-foreground">
                  Use our interview scheduling features to coordinate with candidates seamlessly.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Understanding analytics and insights</h4>
                <p className="text-sm text-muted-foreground">
                  Make data-driven hiring decisions with our analytics dashboard.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Still Need Help */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to assist you with any questions.
            </p>
            <Link href="/employer/contact">
              <Button size="lg" className="bg-[#0A66C2] hover:bg-[#0A66C2]/90">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
