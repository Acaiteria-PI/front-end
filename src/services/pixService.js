import API from '@/services/axios.js'

export const createPixPayment = async (order) => {
  try {
    const { data } = await API.post('api/generate-pix/', order)
    console.log('Resposta do backend (generate-pix):', data)

    if (!data || !data.data?.brCodeBase64) {
      throw new Error('Resposta inválida da AbacatePay')
    }

    return data.data.brCodeBase64
  } catch (error) {
    console.error('Erro ao gerar pagamento PIX:', error)
    throw error
  }
}

export const generateQRCodeDataURL = async (order) => {
  const qrImage = await createPixPayment(order)
  return qrImage
}
