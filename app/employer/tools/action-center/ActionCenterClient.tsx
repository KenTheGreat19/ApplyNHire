"use client"

import { useState } from "react"
import { EmployerSidebar } from "@/components/employer/EmployerSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListChecks, AlertCircle, CheckCircle2, Clock, CalendarDays, PlayCircle } from "lucide-react"

interface ActionCenterClientProps {
  user: {
    name?: string | null
    companyName?: string | null
  }
}

type TaskStatus = "pending" | "in-progress" | "completed"

type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  status: TaskStatus
  priority: "high" | "medium" | "low"
}

const STATUS_STYLES: Record<TaskStatus, string> = {
  pending: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300",
  "in-progress": "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300",
  completed: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300",
}

const PRIORITY_COPY = {
  high: "High",
  medium: "Medium",
  low: "Low",
}

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Review 12 new applicants",
    description: "Screen resumes for the Senior Frontend Engineer role",
    dueDate: "Due today",
    status: "pending",
    priority: "high",
  },
  {
    id: "2",
    title: "Schedule interviews",
    description: "Invite top candidates to next week's panel",
    dueDate: "Due tomorrow",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "3",
    title: "Refresh job budgets",
    description: "Reallocate spend to roles with the highest demand",
    dueDate: "Due Friday",
    status: "pending",
    priority: "medium",
  },
  {
    id: "4",
    title: "Close filled position",
    description: "Mark the Customer Success Lead role as filled",
    dueDate: "Completed",
    status: "completed",
    priority: "low",
  },
]

export default function ActionCenterClient({ user }: ActionCenterClientProps) {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState<TaskStatus | "all">("all")

  const filteredTasks = tasks.filter((task) => (filter === "all" ? true : task.status === filter))

  const completeTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "completed", dueDate: "Completed" } : task
      )
    )
  }

  const pendingCount = tasks.filter((task) => task.status === "pending").length
  const inProgressCount = tasks.filter((task) => task.status === "in-progress").length
  const completedCount = tasks.filter((task) => task.status === "completed").length

  return (
    <div className="flex min-h-screen bg-background">
      <EmployerSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8 max-w-7xl space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Action Center</p>
            <h1 className="text-3xl font-bold">Stay ahead of every hiring task</h1>
            <p className="text-muted-foreground">
              {user.companyName || user.name || "Your company"} · Centralize reviews, follow-ups, and sign-offs
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Pending tasks</CardTitle>
                  <CardDescription>Needs your attention</CardDescription>
                </div>
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">In progress</CardTitle>
                  <CardDescription>Owners assigned</CardDescription>
                </div>
                <Clock className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{inProgressCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Completed</CardTitle>
                  <CardDescription>This week</CardDescription>
                </div>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedCount}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle>Task queue</CardTitle>
                <CardDescription>View and manage the next steps across every pipeline</CardDescription>
              </div>
              <Button variant="outline" className="w-full lg:w-auto">
                <PlayCircle className="mr-2 h-4 w-4" />
                Create follow-up task
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs value={filter} onValueChange={(value) => setFilter(value as TaskStatus | "all")}> 
                <TabsList className="flex flex-wrap">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="in-progress">In progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="mt-6 space-y-4">
                {filteredTasks.length === 0 && (
                  <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
                    No tasks in this bucket.
                  </div>
                )}
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-semibold">{task.title}</p>
                        <Badge className={STATUS_STYLES[task.status]}>
                          {task.status === "in-progress" ? "In progress" : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </Badge>
                        <Badge variant="secondary">{PRIORITY_COPY[task.priority]} priority</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
                    </div>
                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <span className="text-sm text-muted-foreground">{task.dueDate}</span>
                      {task.status !== "completed" ? (
                        <Button size="sm" onClick={() => completeTask(task.id)}>
                          Mark complete
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1 text-sm text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" /> Completed
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming milestones</CardTitle>
                <CardDescription>Automatically generated from your current jobs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Panel interviews", "Offer approvals", "Budget refresh"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border p-4">
                    <CalendarDays className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-semibold">{item}</p>
                      <p className="text-sm text-muted-foreground">
                        {index === 0 ? "Next Tue · 6 candidates" : index === 1 ? "By Fri · Finance review" : "Monthly · Ops"}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workflow checklist</CardTitle>
                <CardDescription>Recommended steps to keep hiring on track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Respond to applicants within 24 hours",
                  "Share interview feedback",
                  "Publish two fresh roles this week",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border p-3">
                    <ListChecks className="mt-1 h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
