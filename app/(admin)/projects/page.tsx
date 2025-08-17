import { PageHeader } from "@/components/admin/shared/PageHeader"
import { ProjectList } from "@/components/admin/projects/ProjectList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProjectsPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Projects", href: "/projects" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Projects" 
          description="Manage your game projects"
          breadcrumbs={breadcrumbs}
        />
        <Link href="/projects/new">
          <Button>Create Project</Button>
        </Link>
      </div>
      <ProjectList />
    </div>
  )
}