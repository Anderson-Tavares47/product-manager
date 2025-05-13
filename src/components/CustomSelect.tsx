"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ErrorIcon from "@/assets/img/alert-color.svg";
import CloseCircle from "@/assets/img/Close-Circle-Dark Background.svg";

interface Option<T = string> {
  value: T;
  label: string;
}

interface CustomSelectProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: boolean;
  className?: string;
  searchable?: boolean;
  clearable?: boolean;
}

function CustomSelect<T = string>({
  value,
  onChange,
  options,
  placeholder = "",
  width = "full",
  disabled = false,
  required = false,
  label,
  error = false,
  className = "",
  searchable = false,
  clearable = true,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleMouseEnter = () => {
    if (disabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    timeoutRef.current = window.setTimeout(() => {
      if (!dropdownRef.current?.matches(":hover")) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }, 300);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("" as T);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={`${width === "full" ? "w-full" : `w-[${width}]`} ${className}`}>
      {label && (
        <label
          className={`block text-sm text-[#636574] mb-1 ${error ? "text-[#CA3D3D]" : ""}`}
        >
          {label} {required && "*"}
        </label>
      )}
      <div
        className="relative"
        ref={selectRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`h-[36px] border rounded-[4px] px-3 py-2 flex items-center justify-between cursor-pointer bg-white text-[14px] text-[#484A55] ${
            isOpen
              ? "ring-2 ring-blue-500 border-transparent"
              : error
              ? "border-[#CA3D3D]"
              : "border-[#8A8C98]"
          } ${disabled ? "!bg-gray-100 cursor-not-allowed" : ""}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span className="truncate flex-1 pr-2">
            {selectedOption?.label || placeholder}
          </span>
          <div className="flex items-center gap-2">
            {!disabled && clearable && value && (
              <div
                className="flex items-center justify-center"
                onClick={handleClear}
              >
              </div>
            )}
            {!disabled && error && (
              <div className="flex items-center justify-center">
              </div>
            )}
            {!disabled && (
              <svg
                className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </div>

        {isOpen && !disabled && (
          <div
            ref={dropdownRef}
            className="absolute z-50 mt-1 w-full bg-white rounded-[4px] shadow-xl max-h-60 overflow-auto border border-gray-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {searchable && (
              <div className="sticky top-0 bg-white p-2 border-b">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full h-[36px] border border-[#8A8C98] rounded-[4px] pl-8 pr-3 text-[14px] text-[#484A55] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <div className="absolute left-2 top-2.5">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={(option.value as any)?.src || String(option.value)}
                  className={`px-3 py-2 cursor-pointer text-[14px] text-[#484A55] hover:bg-[#F5F5F6] ${
                    value === option.value ? "bg-blue-50" : ""
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">Nenhuma opção encontrada</div>
            )}
          </div>
        )}
      </div>
      {error && !isOpen && (
        <p className="mt-1 text-xs text-[#CA3D3D]">{label} é obrigatório</p>
      )}
    </div>
  );
}

export default CustomSelect;
