
/*eslint-disable*/
import ToastComponent from '../components/Toast.vue'
// let $vm
export default {
    install (_Vue, options) {
        const ToastConstructor = _Vue.extend(ToastComponent) 
        const instance = new ToastConstructor()   //创建alert子实例
        instance.$mount(document.createElement('div')) //挂载实例到我们创建的DOM上
        document.body.appendChild(instance.$el)
        _Vue.prototype.$showToast = (head, msg, callback) => {
            instance.head = head;
            instance.msg = msg;
            instance.show = true;
            instance.callback = callback
        }
    }
}
