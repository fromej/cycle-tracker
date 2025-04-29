import { useBreakpoints } from '@vueuse/core'
import { ComputedRef } from 'vue'

interface DeviceInfo {
    isMobile: ComputedRef<boolean>
    isTablet: ComputedRef<boolean>
    isDesktop: ComputedRef<boolean>
}

export function useDevice(): DeviceInfo {
    const breakpoints = useBreakpoints({
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
    })

    const isMobile = breakpoints.smaller('md')
    const isTablet = breakpoints.between('md', 'lg')
    const isDesktop = breakpoints.greater('lg')

    return {
        isMobile,
        isTablet,
        isDesktop,
    }
}
