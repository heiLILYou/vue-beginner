import Vue from 'core/index'
// import config from 'core/config'

Vue.prototype.$mount = function(el,hydrating){
    return el;
}

export default Vue