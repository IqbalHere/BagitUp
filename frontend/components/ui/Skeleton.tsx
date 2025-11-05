'use client'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rect' | 'circle'
  width?: string
  height?: string
}

export default function Skeleton({
  className = '',
  variant = 'rect',
  width,
  height,
}: SkeletonProps) {
  const baseStyles = 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:1000px_100%]'
  
  const variantStyles = {
    text: 'h-4 rounded',
    rect: 'rounded-lg',
    circle: 'rounded-full',
  }

  const style: React.CSSProperties = {
    width: width || (variant === 'circle' ? height : '100%'),
    height: height || (variant === 'text' ? '1rem' : '100px'),
  }

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    />
  )
}

export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <Skeleton variant="rect" height="200px" className="mb-4" />
      <Skeleton variant="text" className="mb-2" />
      <Skeleton variant="text" width="60%" className="mb-4" />
      <Skeleton variant="text" width="40%" />
    </div>
  )
}

export function TripSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circle" width="50px" height="50px" />
        <div className="flex-1">
          <Skeleton variant="text" width="70%" className="mb-2" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="rect" height="100px" />
    </div>
  )
}
