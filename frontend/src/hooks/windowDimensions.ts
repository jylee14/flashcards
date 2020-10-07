/**
 * custom hook to grab window width/height within the app
 * source: https://stackoverflow.com/a/36862446
 */

import { useState, useEffect } from 'react'

interface Dimension {
  width: number;
  height: number;
}

const getWindowDimensions = () => {
  const dimension: Dimension = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  return dimension
}

export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dimensions
}