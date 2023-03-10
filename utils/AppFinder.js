import { CccdApp } from '@/utils/CccdApp'
import { CduiApp } from '@/utils/CduiApp'

export default function AppFinder(app) {
  return {
    cccd: CccdApp,
    cdui: CduiApp,
  }[app]
}