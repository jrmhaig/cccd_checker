export default class PingResult {
  constructor({ response_time, defaults, data }) {
    this.response_time = response_time
    this.defaults = defaults
    this.data = { ...defaults, ...data }
  }

  key() { return this.data?.key || '???' }

  environment() { return this.data?.environment || '???' }

  app_branch() { return this.data?.app_branch || '???' }

  commit_id() { return this.data?.commit_id || '???' }

  build_date() { return this.data?.build_date || '???' }

  github() { return this.data?.github || '???' }
}