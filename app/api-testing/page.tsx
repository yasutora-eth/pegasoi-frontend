'use client'

import { RealDataProcessor } from '@/components/RealDataProcessor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, TestTube } from 'lucide-react'

export default function ApiTesting() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 flex items-center gap-2 text-4xl font-bold">
          <TestTube className="h-8 w-8" />
          Real API Testing & Data Processing
        </h1>
        <p className="text-muted-foreground">
          Test live external APIs and verify data retrieval, processing, and
          display
        </p>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          This page tests real external APIs: ArXiv (XML), DOAJ (JSON), Crossref
          (JSON), and Getty (varies). Make sure your backend is running on port
          8000.
        </AlertDescription>
      </Alert>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">ArXiv</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-xs">
              XML Format
            </Badge>
            <p className="mt-1 text-xs text-muted-foreground">
              Physics, Math, CS papers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">DOAJ</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-xs">
              JSON Format
            </Badge>
            <p className="mt-1 text-xs text-muted-foreground">
              Open access journals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Crossref</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-xs">
              JSON Format
            </Badge>
            <p className="mt-1 text-xs text-muted-foreground">DOI metadata</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Getty</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-xs">
              Varies
            </Badge>
            <p className="mt-1 text-xs text-muted-foreground">Art & culture</p>
          </CardContent>
        </Card>
      </div>

      <RealDataProcessor />
    </div>
  )
}
