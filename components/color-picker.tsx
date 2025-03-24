"use client"

import type React from "react"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

const predefinedColors = [
  "#1e40af", // Blue
  "#1e3a8a", // Dark Blue
  "#0f766e", // Teal
  "#065f46", // Green
  "#b91c1c", // Red
  "#7e22ce", // Purple
  "#c2410c", // Orange
  "#78716c", // Gray
  "#1c1917", // Black
]

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState(color)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value)
  }

  const handleInputBlur = () => {
    onChange(inputColor)
  }

  const handleColorSelect = (selectedColor: string) => {
    setInputColor(selectedColor)
    onChange(selectedColor)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal h-10"
          style={{ backgroundColor: color }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }} />
            <span>{color}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {predefinedColors.map((presetColor) => (
              <button
                key={presetColor}
                className="w-full h-8 rounded border"
                style={{ backgroundColor: presetColor }}
                onClick={() => handleColorSelect(presetColor)}
                aria-label={`Select color ${presetColor}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border" style={{ backgroundColor: inputColor }} />
            <Input
              type="text"
              value={inputColor}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="#000000"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

