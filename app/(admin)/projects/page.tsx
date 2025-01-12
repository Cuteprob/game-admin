import { PageHeader } from "@/components/admin/shared/PageHeader"
import { ProjectList } from "@/components/admin/projects/ProjectList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Projects" 
          description="Manage your game projects"
        />
        <Link href="/projects/new">
          <Button>Create Project</Button>
        </Link>
      </div>
      <ProjectList />
    </div>
  )
}