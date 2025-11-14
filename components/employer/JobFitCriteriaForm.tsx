"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { toast } from "sonner"

interface JobFitCriteriaFormProps {
  jobId: string
  initialData?: any
  onSuccess?: () => void
}

const educationLevels = [
  { value: "high_school", label: "High School" },
  { value: "associate", label: "Associate Degree" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "phd", label: "PhD/Doctorate" },
]

export function JobFitCriteriaForm({ jobId, initialData, onSuccess }: JobFitCriteriaFormProps) {
  const [loading, setLoading] = useState(false)
  
  // Form state
  const [requiredEducation, setRequiredEducation] = useState(initialData?.requiredEducation || "")
  const [preferredEducation, setPreferredEducation] = useState(initialData?.preferredEducation || "")
  const [minYears, setMinYears] = useState(initialData?.minYearsExperience?.toString() || "0")
  const [preferredYears, setPreferredYears] = useState(initialData?.preferredYearsExperience?.toString() || "0")
  
  // Skills arrays
  const [essentialSkills, setEssentialSkills] = useState<string[]>(initialData?.essentialSkills || [])
  const [technicalSkills, setTechnicalSkills] = useState<string[]>(initialData?.technicalSkills || [])
  const [personalAttributes, setPersonalAttributes] = useState<string[]>(initialData?.personalAttributes || [])
  const [culturalValues, setCulturalValues] = useState<string[]>(initialData?.culturalValues || [])
  
  // Input fields for adding items
  const [newEssentialSkill, setNewEssentialSkill] = useState("")
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("")
  const [newAttribute, setNewAttribute] = useState("")
  const [newValue, setNewValue] = useState("")

  const addItem = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    if (value.trim()) {
      setter(prev => [...prev, value.trim()])
      inputSetter("")
    }
  }

  const removeItem = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/jobs/${jobId}/fit-criteria`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requiredEducation,
          preferredEducation,
          minYearsExperience: parseInt(minYears) || 0,
          preferredYearsExperience: parseInt(preferredYears) || 0,
          essentialSkills,
          technicalSkills,
          personalAttributes,
          culturalValues,
        }),
      })

      if (!response.ok) throw new Error("Failed to save criteria")

      toast.success("Job fit criteria saved successfully!")
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error("Failed to save job fit criteria")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Job Fit Criteria</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Define the requirements for this position. This will help applicants see how well they match the role.
        </p>
      </div>

      {/* Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Required Education</Label>
          <Select value={requiredEducation} onValueChange={setRequiredEducation}>
            <SelectTrigger>
              <SelectValue placeholder="Select required education" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map(level => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Preferred Education</Label>
          <Select value={preferredEducation} onValueChange={setPreferredEducation}>
            <SelectTrigger>
              <SelectValue placeholder="Select preferred education" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map(level => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Minimum Years of Experience</Label>
          <Input
            type="number"
            min="0"
            value={minYears}
            onChange={(e) => setMinYears(e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label>Preferred Years of Experience</Label>
          <Input
            type="number"
            min="0"
            value={preferredYears}
            onChange={(e) => setPreferredYears(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      {/* Essential Skills */}
      <div className="space-y-2">
        <Label>Essential Skills (Soft Skills)</Label>
        <div className="flex gap-2">
          <Input
            value={newEssentialSkill}
            onChange={(e) => setNewEssentialSkill(e.target.value)}
            placeholder="e.g., Communication, Teamwork"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addItem(newEssentialSkill, setEssentialSkills, setNewEssentialSkill))}
          />
          <Button type="button" onClick={() => addItem(newEssentialSkill, setEssentialSkills, setNewEssentialSkill)}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {essentialSkills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {skill}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setEssentialSkills)} />
            </Badge>
          ))}
        </div>
      </div>

      {/* Technical Skills */}
      <div className="space-y-2">
        <Label>Technical Skills (Hard Skills)</Label>
        <div className="flex gap-2">
          <Input
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            placeholder="e.g., Python, React, SQL"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addItem(newTechnicalSkill, setTechnicalSkills, setNewTechnicalSkill))}
          />
          <Button type="button" onClick={() => addItem(newTechnicalSkill, setTechnicalSkills, setNewTechnicalSkill)}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {technicalSkills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {skill}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setTechnicalSkills)} />
            </Badge>
          ))}
        </div>
      </div>

      {/* Personal Attributes */}
      <div className="space-y-2">
        <Label>Personal Attributes</Label>
        <div className="flex gap-2">
          <Input
            value={newAttribute}
            onChange={(e) => setNewAttribute(e.target.value)}
            placeholder="e.g., Self-motivated, Detail-oriented"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addItem(newAttribute, setPersonalAttributes, setNewAttribute))}
          />
          <Button type="button" onClick={() => addItem(newAttribute, setPersonalAttributes, setNewAttribute)}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {personalAttributes.map((attr, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {attr}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setPersonalAttributes)} />
            </Badge>
          ))}
        </div>
      </div>

      {/* Cultural Values */}
      <div className="space-y-2">
        <Label>Cultural Values</Label>
        <div className="flex gap-2">
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="e.g., Innovation, Collaboration"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addItem(newValue, setCulturalValues, setNewValue))}
          />
          <Button type="button" onClick={() => addItem(newValue, setCulturalValues, setNewValue)}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {culturalValues.map((value, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {value}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(index, setCulturalValues)} />
            </Badge>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Job Fit Criteria"}
      </Button>
    </form>
  )
}
