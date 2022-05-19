import { makeAutoObservable } from "mobx"

export default class MoneyStore {

  constructor() {
    this._wallets = []
    this._balance = []
    this._documents = []
    this._selectedWallet = {}
    this._update = true

    makeAutoObservable(this)
  }

  setWallets(wallets) {
    this._wallets = wallets;
  }

  setBalance(balance) {
    this._balance = balance;
  }

  setDocuments(documents) {
    this._documents = documents;
  }

  setSelectedWallet(selectedWallet) {
    this._selectedWallet = selectedWallet;
  }

  setUpdate(bool) {
    this._update = bool;
  }

  get wallets() {
    return this._wallets
  }

  get balance() {
    return this._balance
  }

  get documents() {
    return this._documents
  }

  get selectedWallet() {
    return this._selectedWallet
  }

  get update() {
    return this._update
  }
}