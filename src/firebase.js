import { initializeApp } from 'firebase'
import 'firebase/firestore'
import config from './config/config'

export const firebase = initializeApp(config)
export const db = firebase.firestore()
export const currentUser = firebase.auth().currentUser
