import { defineStore } from 'pinia'
import { ref } from 'vue'
import EmployeeApi from '@/services/employeeApi.js'
import { useLoading } from '@/stores/loading.js'
import { useModalStore } from '@/stores/modal.js'

const loadingStore = useLoading()
const modalStore = useModalStore()
const employeeApi = new EmployeeApi()

export const useEmployeeStore = defineStore('employee', () => {

  const employees = ref([])
  const newEmployee = ref({
    id: null,
    name: '',
    email: '',
    registration: null,
    password: '',
    password_confirmation: '',
    Establishment: null,
    is_management: false,
    establishment_data: null
  })

  const fetchEmployees = async () => {
    loadingStore.isLoading = true
    const data = await employeeApi.fetchEmployees()
    employees.value = Array.isArray(data.results) ? [...data.results] : [...data]
    loadingStore.isLoading = false
  }

  const createEmployee = async (employee) => {
    try {
      loadingStore.isLoading = true
      if (!employee.password || employee.password !== employee.password_confirmation) {
        alert('As senhas devem coincidir')
        loadingStore.isLoading = false
      } else {

        const created = await employeeApi.createEmployee(employee)
        employees.value.push(created)

        newEmployee.value = {
          id: null,
          name: '',
          email: '',
          registration: null,
          password: '',
          password_confirmation: '',
          Establishment: null,
          is_management: false,
          establishment_data: null
        }

        modalStore.closeCreateModal()
        loadingStore.isLoading = false
      }
    } catch (err) {
      console.error('Error creating employee', err)
      loadingStore.isLoading = false
    }
  }

  const updateEmployee = async () => {
    try {
      loadingStore.isLoading = true

      await employeeApi.updateEmployee(modalStore.editingItem)

      await fetchEmployees()
      modalStore.closeCreateModal()
      loadingStore.isLoading = false

    } catch (err) {
      console.error('Error updating employee: ', err)
      loadingStore.isLoading = false
    }
  }

  const deleteEmployee = async (id) => {
    try {
      loadingStore.isLoading = true

      await employeeApi.deleteEmployee(id)
      employees.value = employees.value.filter(employee => employee.id !== id)

      modalStore.closeConfirmDeleteModal()
      loadingStore.isLoading = false
    } catch (err) {
      console.error('Error deleting employee:', err)
      loadingStore.isLoading = false
    }
  }

  return {
    employees, newEmployee, fetchEmployees, createEmployee, updateEmployee, deleteEmployee
  }
})
