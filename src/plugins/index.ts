import type { App } from 'vue'
import router from '@/router'
import { notivue } from './notivue'

/**
 * Register plugins
 * @param app - Vue app instance
 * @description This function registers all plugins for the application
 */
export function registerPlugins(app: App) {
  app
    .use(router)
    .use(notivue)
}
