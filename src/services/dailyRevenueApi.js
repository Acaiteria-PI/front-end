import API from '@/services/axios'

export default class DailyRevenueApi {
  async fetchDailyRevenues({ startDate, endDate } = {}) {
    const params = {}

    if (startDate) params.start_date = startDate
    if (endDate) params.end_date = endDate

    const { data } = await API.get('api/daily-revenues/', {params})
    return data
  }
}
