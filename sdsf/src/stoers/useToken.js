import {defineStore} from 'pinia'
import {ref} from 'vue'

const useTokenStore = defineStore('token', () => {
        const token = {username: ref(''), password: ref('')}
        const removeToken = () => {
            token.value = ''
        }
        return {token, removeToken}
    }
    // {persist: true}
)

export default useTokenStore
