"use client"

import { PrivateRoute } from "@/components/PrivateRoute"
import { EnhancedMultiSourceSearch } from "@/components/EnhancedMultiSourceSearch"
import { ArticleManager } from "@/components/ArticleManager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResearchGallery() {
  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">Research Gallery</h1>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Enhanced Multi-Source Search</TabsTrigger>
            <TabsTrigger value="manage">Article Management</TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <EnhancedMultiSourceSearch />
          </TabsContent>

          <TabsContent value="manage">
            <ArticleManager />
          </TabsContent>
        </Tabs>
      </div>
    </PrivateRoute>
  )
}
