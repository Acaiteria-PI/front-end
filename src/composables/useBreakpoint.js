import { ref, onMounted, onUnmounted } from 'vue'

export function useBreakpoint(breakpoint = 768) {
  const isDesktop = ref(window.innerWidth >= breakpoint)

  const check = () => {
    isDesktop.value = window.innerWidth >= breakpoint
  }

  onMounted(() => {
    check()
    window.addEventListener('resize', check)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', check)
  })

  return {
    isDesktop
  }
}
