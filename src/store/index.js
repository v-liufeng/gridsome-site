import token from './modules/token'
import user from './modules/user'
import configuration from './modules/configuration'
import getters from './getters'

const store = {
    modules: {
        token,
        user,
        configuration
    },
    getters
}

export default store