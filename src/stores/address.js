import { defineStore } from 'pinia'
import { ref } from 'vue'
import AddressApi from '@/services/addressApi'

const addressApi = new AddressApi()

export const useAddressStore = defineStore('address', () => {
  const addresses = ref([])
  const newAddress = ref({
    id: null,
    street: '',
    number: '',
    city: '',
    state: '',
    zip_code: '',
  })

  const fetchAddresses = async () => {
    const data = await addressApi.fetchAddresses()
    addresses.value = Array.isArray(data.results) ? [...data.results] : [...data]
  }

  const createAddress = async (address) => {
    try {
      const created = await addressApi.createAddress(address)
      addresses.value.push(created)
      newAddress.value = {
        id: null,
        street: '',
        number: '',
        city: '',
        state: '',
        zip_code: '',
      }
      await fetchAddresses()
      return created
    } catch (error) {
      console.error('Error creating address:', error)
    }
  }

  const updateAddress = async (address) => {
    try {
      await addressApi.updateAddress(address)
      await fetchAddresses()
    } catch (error) {
      console.error('Error updating address:', error)
    }
  }

  const deleteAddress = async (addressId) => {
    try {
      await addressApi.deleteAddress(addressId)
      addresses.value = addresses.value.filter(address => address.id !== addressId)
      await fetchAddresses()
    } catch (error) {
      console.error('Error deleting address:', error)
    }
  }

  return { fetchAddresses, addresses, createAddress, newAddress, updateAddress, deleteAddress }
})
