/* @flow */

//can we use _proto_?
export const hasProto = '_proto_' in {}

//Browser enviroment sniffing
export const inBrowser = typeof window !== 'undefined'
export const inWeex = typeof WXEEnvironment !== 'undefined' && !!WXEEnvironment.platform
export const weexPlatform = inWeex && WXEEnvironment.platform.toLowerCase()
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const isPhantomJS = UA && /phantomjs/.test(UA)
export const isFF = UA && UA.match(/firefox\/(\d+)/)

//Firefox has a "watch" function on Object.prototype...
export const nativeWatch = ({}).watch

export let supportsPassive = false
if(inBrowser){
    try{
        const opts ={}
        Object.defineProperties(opts,'passive',({
            get(){
                //istanbul ignore next
                supportsPassive = true
            }
        }:Object))
        window.addEventListener('test-passive',null,opts)
    }catch(e){}
}

//this needs to be lazy-evaled because vue may be required before
//vue-server-renderer can set VUE_ENV
let _isServer
export const isServerRendering = ()=>{
    if(_isServer === undefined){
        //istanbul ignore if
        if(inBrowser && !inWeex && typeof global !== 'undefined'){
            //detect presence of vue-server-render and avoid
            //Webpack shimming the process
            _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
        }else{
            _isServer = false
        }
    }
    return _isServer
}

//detect devtools
export const devtools = inBrowser && window._VUE_DEVTOOLS_GLOBAL_HOOK_

//istanbul ignore next
export function isNative (Ctor:any):boolean{
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export const hasSymbol = 
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)

let _Set
//istanbul ignore if $flow-disable-line
if(typeof Set !== 'undefined' && isNative(Set)){
    //use native Set when available;
    _Set = Set
}else{
    //a non-standard Set polyfill that only works with primitive keys
    _Set = class Set implements SimpleSet{
        set:Object;
        constructor(){
            this.set = Object.create(null)
        }
        has(key:string | number){
            return this.set[key] === true
        }
        add(key:string | number){
            this.set[key] = true;
        }
        clear(){
            this.set = Object.create(null)
        }
    }
}

export interface SimpleSet{
    has(key: string | number): boolean;
    add(key: string | number): mixed;
    clear(): void;
}

export {_Set}