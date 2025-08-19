"use client"

import type React from "react"

import { PrivateRoute } from "@/components/PrivateRoute"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiService } from "@/lib/api"

export default function SubmitArticle() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [reference, setReference] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await apiService.createArticle({
        title,
        content,
        author,
        reference,
      })

      alert("Article submitted successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting article:", error)
      alert("Failed to submit article. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">Submit Article</h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Article Submission Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={10}
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="reference">Reference</Label>
                <Input id="reference" value={reference} onChange={(e) => setReference(e.target.value)} required />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Article"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PrivateRoute>
  )
}
