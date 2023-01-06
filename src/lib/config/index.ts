import fs from 'fs'
import path from 'path'
import * as url from 'url'
import defaults from './defaults.js'
import { merge } from './utils.js'
import type { Config } from '../exports/index'

export const config =  async (): Promise<Config> => {
  const config_file = path.join(process.cwd(), 'supakit.config.js')

  if (!fs.existsSync(config_file)) return defaults

  const user_config = await import(url.pathToFileURL(config_file).href)

  if (typeof user_config.default !== 'object') throw new Error('supakit.config.js must be an object')

  /**
   * TODO: validate config before returning
   */

  return merge(defaults, user_config.default)
}
