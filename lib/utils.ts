import { twMerge } from "tailwind-merge"

export type ClassValue = string | undefined | null | boolean | Record<string, boolean> | ClassValue[]

function classNames(...inputs: ClassValue[]): string {
  const classes: string[] = []

  const flatten = (input: ClassValue): void => {
    if (!input) return

    if (typeof input === "string") {
      classes.push(input)
    } else if (Array.isArray(input)) {
      input.forEach(flatten)
    } else if (typeof input === "object") {
      Object.entries(input).forEach(([key, value]) => {
        if (value) classes.push(key)
      })
    }
  }

  inputs.forEach(flatten)
  return classes.join(" ")
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(classNames(inputs))
}
