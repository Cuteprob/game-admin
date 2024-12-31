"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = (option: string) => {
    onChange(selected.filter((s) => s !== option))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = e.target as HTMLInputElement
    if (e.key === "Delete" || e.key === "Backspace") {
      if (input.value === "" && selected.length > 0) {
        handleUnselect(selected[selected.length - 1])
      }
    }
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const selectables = options.filter((option) => 
    !selected.includes(option.value) &&
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <Command className="overflow-visible bg-transparent">
      <div
        className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => {
            const selectedOption = options.find((o) => o.value === option)
            return (
              <Badge
                key={option}
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {selectedOption?.label}
                <button
                  className="ml-1 rounded-sm hover:bg-muted"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setOpen(false)
              setInputValue("")
            }}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : undefined}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 && (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange([...selected, option.value])
                    setInputValue("")
                  }}
                  className="cursor-pointer"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  )
} 