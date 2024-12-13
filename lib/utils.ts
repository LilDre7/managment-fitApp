import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Bell } from "lucide-react";
import { User2 } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navLinks = [];

export const iconNav = [
  {
    name: "alert",
    icon: React.createElement(Bell),
  },
  {
    name: "user",
    icon: React.createElement(User2),
  },
];
