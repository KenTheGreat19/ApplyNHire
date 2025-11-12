"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { JobsDataTable } from "@/components/JobsDataTable"
import { JobFormDialog } from "@/components/JobFormDialog"
import { Plus, Briefcase, Clock, CheckCircle2, XCircle } from "lucide-react"
import { Job } from "@prisma/client"
import { toast } from "sonner"

type JobWithApplications = Job & {
  _count: {
    applications: number
  }
}

interface EmployerDashboardClientProps {
  companyName: string
}

export default function EmployerDashboardClient({ companyName }: EmployerDashboardClientProps) {
  const [jobs, setJobs] = React.useState<JobWithApplications[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [showJobDialog, setShowJobDialog] = React.useState(false)
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null)
  const [jobToDelete, setJobToDelete] = React.useState<string | null>(null)

  const fetchJobs = React.useCallback(async () => {
    try {
      const response = await fetch("/api/jobs")
      if (!response.ok) throw new Error("Failed to fetch jobs")
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      toast.error("Failed to load jobs")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handleEditJob = (job: Job) => {
    setSelectedJob(job)
    setShowJobDialog(true)
  }

  const handleDeleteJob = async () => {
    if (!jobToDelete) return

    try {
      const response = await fetch(`/api/jobs/${jobToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete job")

      toast.success("Job deleted successfully")
      fetchJobs()
    } catch (error) {
      toast.error("Failed to delete job")
    } finally {
      setJobToDelete(null)
    }
  }

  const handleNewJob = () => {
    setSelectedJob(null)
    setShowJobDialog(true)
  }

  const stats = React.useMemo(() => {
    return {
      total: jobs.length,
      pending: jobs.filter((j) => j.status === "pending").length,
      approved: jobs.filter((j) => j.status === "approved").length,
      rejected: jobs.filter((j) => j.status === "rejected").length,
    }
  }, [jobs])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Job Postings</CardTitle>
              <CardDescription>Manage all your job listings</CardDescription>
            </div>
            <Button onClick={handleNewJob}>
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <JobsDataTable
            data={jobs}
            onEdit={handleEditJob}
            onDelete={setJobToDelete}
          />
        </CardContent>
      </Card>

      <JobFormDialog
        open={showJobDialog}
        onOpenChange={setShowJobDialog}
        job={selectedJob}
        companyName={companyName}
        onSuccess={fetchJobs}
      />

      <AlertDialog open={!!jobToDelete} onOpenChange={() => setJobToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your job posting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteJob} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
