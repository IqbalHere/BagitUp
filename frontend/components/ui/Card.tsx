'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: 'default' | 'glass' | 'gradient'
  hover?: boolean
  className?: string
}

export default function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-xl transition-all duration-300'
  
  const variantStyles = {
    default: 'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700',
    glass: 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-xl',
    gradient: 'bg-gradient-to-br from-electric-500/10 via-mint-500/10 to-lavender-500/10 dark:from-electric-900/20 dark:via-mint-900/20 dark:to-lavender-900/20 border border-electric-200 dark:border-electric-800 shadow-lg',
  }

  const hoverScale = hover ? 1.02 : 1

  return (
    <motion.div
      whileHover={{ scale: hoverScale, y: hover ? -4 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
