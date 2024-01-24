import { get, add } from "./client.js"

const initSignup = async () => {
    const users = await get('users')
    const newId = users.length

    const form = document.getElementById('signup-form')
}