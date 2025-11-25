import {defineStore} from "pinia";
import {ref} from "vue";
import OrderItemApi from "@/services/orderItemApi";
import {useLoading} from "@/stores/loading.js";
import {useModalStore} from "@/stores/modal.js";

const loadingStore = useLoading()
const modalStore = useModalStore()
const orderItemApi = new OrderItemApi()

export const useOrderItemStore = defineStore('orderItem', () => {
    const orderItems = ref([])
    const newOrderItem = ref({
      id: null,
      type: '',
      final_cup: null,
      custom_cup: null,
      combo: null,
      order: null,
      quantity: null,
      unity_price: null,
      total_price: null
    })

    const fetchOrderItems = async () => {
      loadingStore.isLoading = true
      const data = await orderItemApi.fetchOrderItems()
      orderItems.value = Array.isArray(data.results) ? [...data.results] : [...data]
      loadingStore.isLoading = false
    }

    const createOrderItem = async (order) => {
      try {
        loadingStore.isLoading = true
        const created = await orderItemApi.createOrderItem(order)
        orderItems.value.push(created)

        newOrderItem.value = {
          id: null,
          type: '',
          final_cup: null,
          custom_cup: null,
          combo: null,
          order: null,
          quantity: null,
          unity_price: null,
          total_price: null
        }

        modalStore.closeCreateModal()
        loadingStore.isLoading = false
      } catch (err) {
        console.error('Error creating order', err)
        loadingStore.isLoading = false
      }
    }

    const updateOrderItem = async () => {
      try {
        loadingStore.isLoading = true

        await orderItemApi.updateOrderItem(modalStore.editingItem)

        await fetchOrderItems()
        modalStore.closeCreateModal()
        loadingStore.isLoading = false

      } catch (err) {
        console.error('Error updating order', err)
        loadingStore.isLoading = false
      }
    }

    const deleteOrderItem = async (id) => {
      try {
        loadingStore.isLoading = true

        await orderItemApi.deleteOrderItem(id)
        orderItems.value = orderItems.value.filter(order => order.id !== id)
        modalStore.closeConfirmDeleteModal()

        loadingStore.isLoading = false
      } catch (err) {
        console.error('Error deleting order', err)
        loadingStore.isLoading = false
      }
    }

    return {
      orderItems,
      fetchOrderItems,
      createOrderItem,
      updateOrderItem,
      deleteOrderItem
    }
  }
)
