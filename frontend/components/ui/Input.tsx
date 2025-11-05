'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500 dark:focus:ring-electric-400'
    const normalStyles = 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
    const errorStyles = 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
    const widthStyle = fullWidth ? 'w-full' : ''

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${error ? errorStyles : normalStyles} ${widthStyle} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
