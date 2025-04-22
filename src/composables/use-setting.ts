import type { Setting } from '@/types/setting'
import { useLocalStorage } from '@vueuse/core'

const STORAGE_KEY = 'setting'

export function useSettingLocalStorage() {
  const setting = useLocalStorage<Setting>(STORAGE_KEY, {
    robotAPIURL: '',
  })

  function importSetting(s: Setting) {
    setting.value = s
  }

  return {
    setting,
    importSetting,
  }
}
