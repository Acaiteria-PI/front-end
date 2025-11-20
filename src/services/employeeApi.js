import API from '@/services/axios'

export default class EmployeeApi {
  async fetchEmployees() {
    const { data } =  await API.get('api/users/')
    return data
  }
  async createEmployee(employee) {
    const { data } = await API.post('api/users/', employee)
    return data
  }
  async updateEmployee(employee) {
    const { data } = await API.put(`api/users/${employee.id}/`, employee)
    return data
  }
  async deleteEmployee(id) {
    await API.delete(`api/users/${id}/`)
  }
}
