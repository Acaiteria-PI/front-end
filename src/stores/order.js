import {defineStore} from "pinia";
import {ref} from "vue";
import OrderApi from "@/services/orderApi";
import {useModalStore} from "@/stores/modal.js";
import {useLoading} from "@/stores/loading.js";
import {useOrderItemStore} from "@/stores/orderItem.js";

const orderApi = new OrderApi()

export const useOrderStore = defineStore('order', () => {
    const modalStore = useModalStore()
    const loadingStore = useLoading()
    const orderItemStore = useOrderItemStore()
    const editingOrder = ref(null)

    const orders = ref([])
    const newOrder = ref({
      id: null,
      status: '',
      customer: '',
      order_date: null,
      establishment: null,
      total_amount: null,
      is_paid: false
    })

    const fetchOrders = async () => {
      loadingStore.isLoading = true
      const data = await orderApi.fetchOrders()
      orders.value = Array.isArray(data.results) ? [...data.results] : [...data]
      loadingStore.isLoading = false
    }

    const getOrderItems = (order) => {
      return orderItemStore.orderItems.filter(item => item.order === order.id)
    }

    const createOrder = async (order) => {
      try {
        loadingStore.isLoading = true
        const created = await orderApi.createOrder(order)
        orders.value.push(created)

        newOrder.value = {
          id: null,
          status: '',
          customer: '',
          order_date: null,
          establishment: null,
          total_amount: null,
          is_paid: false
        }

        modalStore.closeCreateModal()
        await fetchOrders()
        loadingStore.isLoading = false
      } catch (err) {
        console.error('Error creating order', err)
        loadingStore.isLoading = false
      }
    }

    const updateOrder = async (order) => {
      try {
        loadingStore.isLoading = true

        await orderApi.updateOrder(order)

        await fetchOrders()
        loadingStore.isLoading = false

      } catch (err) {
        console.error('Error updating order', err)
        loadingStore.isLoading = false
      }
    }

    const deleteOrder = async (id) => {
      try {
        loadingStore.isLoading = true

        await orderApi.deleteOrder(id)
        orders.value = orders.value.filter(order => order.id !== id)
        modalStore.closeConfirmDeleteModal()

        loadingStore.isLoading = false
      } catch (err) {
        console.error('Error deleting order', err)
        loadingStore.isLoading = false
      }
    }

    return {
      newOrder,
      orders,
      editingOrder,
      fetchOrders,
      createOrder,
      updateOrder,
      deleteOrder,
      getOrderItems
    }
  }
)
