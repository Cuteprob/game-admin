import { PageHeader } from "@/components/admin/shared/PageHeader"
import { ProjectForm } from "@/components/admin/projects/ProjectForm"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: 'Create Project - Game Admin',
  description: 'Create a new game project'
}

export default function NewProjectPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Create Project", href: "/projects/new" }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader 
        title="Create Project" 
        description="Create a new game project and configure its languages"
        breadcrumbs={breadcrumbs}
      />
      
      <Card>
        <CardContent className="pt-6">
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  )
} 