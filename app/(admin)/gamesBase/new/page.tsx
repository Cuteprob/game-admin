import { PageHeader } from "@/components/admin/shared/PageHeader"
import { GameForm } from "@/components/admin/games/GameForm"

export default function NewGamePage() {
  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950/30">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <PageHeader
            title="Add New Game"
            description="Create a new game entry in the database"
          />
          <GameForm />
        </div>
      </div>
    </div>
  )
} 