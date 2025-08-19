"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Submit() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    reference: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setMessage("Article submitted successfully!")
      setFormData({ title: "", content: "", author: "", reference: "" })
    } catch (err) {
      setMessage("Failed to submit article")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Submit Article</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Article Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={handleChange("title")} required />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" value={formData.author} onChange={handleChange("author")} required />
            </div>

            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input id="reference" value={formData.reference} onChange={handleChange("reference")} required />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" value={formData.content} onChange={handleChange("content")} rows={10} required />
            </div>

            {message && (
              <div
                className={`text-sm p-3 rounded ${
                  message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Article"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
