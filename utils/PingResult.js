export default class PingResult {
  constructor({ response_time, defaults, data }) {
    this.response_time_seconds = response_time
    this.defaults = defaults
    this.data = { ...defaults, ...data }
  }

  key() { return this.data?.key || '???' }

  environment() { return this.data?.environment || '???' }

  app_branch() { return this.data?.app_branch || '???' }

  commit_id() { return this.data?.commit_id || '???' }

  build_date() { return this.data?.build_date?.toLocaleString('en-GB') || '???' }

  github() { return this.data?.github || '???' }

  response_time() { return Math.round(this.response_time_seconds * 100) / 100 }
}
