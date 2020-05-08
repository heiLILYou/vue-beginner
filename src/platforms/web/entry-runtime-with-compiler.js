// import config from 'core/config'
import Vue from './runtime/index'

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function(el,hydrating){    
    return this;
}