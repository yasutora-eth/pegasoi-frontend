import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Information() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Information</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Learn about our mission, vision, and the team behind the Research
              Portal.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submission Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Detailed instructions on how to submit your research articles for
              publication.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Peer Review Process</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Understanding our rigorous peer review process for ensuring
              quality research.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Get in touch with our editorial team or support staff for any
              queries.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
