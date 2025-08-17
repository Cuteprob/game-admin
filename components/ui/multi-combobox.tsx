"use client"

import * as React from "react"
import { Check, X, ChevronsUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { Option, MultiComboboxProps } from '@/types/ui'

export function MultiCombobox({
  options,
  selected = [],
  onChange,
  placeholder = "Select items...",
  freeform = false,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  // 合并预定义选项和自定义选项
  const allOptions = React.useMemo(() => {
    const customOptions = (selected || [])
      .filter(value => !options.some(opt => opt.value === value))
      .map(value => ({ value, label: value }))
    return [...options, ...customOptions]
  }, [options, selected])

  const selectedOptions = allOptions.filter((option) => 
    selected?.includes(option.value)
  )

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (option: Option) => {
    const isSelected = selected?.includes(option.value)
    const newSelected = isSelected
      ? (selected || []).filter((value) => value !== option.value)
      : [...(selected || []), option.value]
    onChange(newSelected)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!freeform) return

    if (e.key === 'Enter' && search.trim()) {
      e.preventDefault()
      const newValue = search.trim()
      if (!selected?.includes(newValue)) {
        onChange([...(selected || []), newValue])
      }
      setSearch("")
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex flex-wrap gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant="secondary"
                  className="mr-1"
                >
                  {option.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleSelect(option)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2" align="start">
        <div className="flex flex-col gap-2">
          <Input
            placeholder={freeform ? "Type and press Enter to add..." : "Search..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8"
          />
          <div className="max-h-[300px] overflow-auto">
            {filteredOptions.map((option) => {
              const isSelected = selected?.includes(option.value)
              return (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground",
                    isSelected && "bg-accent"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    <Check className={cn("h-3 w-3", !isSelected && "opacity-0")} />
                  </div>
                  <span>{option.label}</span>
                </div>
              )
            })}
            {filteredOptions.length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-2">
                {freeform 
                  ? "Type and press Enter to add a new item" 
                  : "No results found"}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 