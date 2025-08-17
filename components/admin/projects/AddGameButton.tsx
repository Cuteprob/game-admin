"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AddGameForm } from "@/components/admin/projects/AddGameForm"
import { Project, AddGameButtonProps } from '@/types/project'

export function AddGameButton({ project, onSuccess, variant = "default", size = "default", children }: AddGameButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={variant} size={size}>
        {children || "Add Game"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add Game to {project.name}</DialogTitle>
          </DialogHeader>
          <AddGameForm 
            project={project}
            onSuccess={() => {
              setOpen(false)
              onSuccess?.()
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
} 