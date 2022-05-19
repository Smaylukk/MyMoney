import { $authhost } from "."


//CURRENCY
export const getAllCurrency = async () => {
  const { data } = await $authhost.get('api/currency')

  return data
}

export const getCurrency = async (id) => {
  const { data } = await $authhost.get('api/currency/' + id)

  return data
}

//BALANCE
export const getBalanceCurrency = async () => {
  const { data } = await $authhost.get('api/wallet/balanceCurrency')

  return data
}

export const getBalanceWallets = async () => {
  const { data } = await $authhost.get('api/wallet/balance')

  return data
}

//WALLET
export const getAllWallet = async () => {
  const { data } = await $authhost.get('api/wallet')

  return data
}

export const getWallet = async (id) => {
  const { data } = await $authhost.get('api/wallet/' + id)

  return data
}

export const createWallet = async (wallet) => {
  const { data } = await $authhost.post('api/wallet', wallet)

  return data
}

export const changeWallet = async (id, wallet) => {
  const { data } = await $authhost.put('api/wallet/' + id, wallet)

  return data
}

export const deleteWallet = async (id) => {
  const { data } = await $authhost.delete('api/wallet/' + id)

  return data
}


//DOCUMENTS
export const getAllDocument = async () => {
  const { data } = await $authhost.get('api/document')
  
  return data
}

export const getDocument = async (id) => {
  const { data } = await $authhost.get('api/document/' + id)

  return data
}

export const createDocument = async (document) => {
  const { data } = await $authhost.post('api/document', document)

  return data
}

export const changeDocument = async (id, document) => {
  const { data } = await $authhost.put('api/document/' + id, document)

  return data
}

export const deleteDocument = async (id) => {
  const { data } = await $authhost.delete('api/document/' + id)

  return data
}