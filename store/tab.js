
import Cookie from "js-cookie"
// import router from "vue-router"

export default{
    state: {
        isCollapse: false,
        tabslist: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMemu: null,
        menu: []
        
    },
    mutations:{
        collaspe(state){
           state.isCollapse = !state.isCollapse
        },
        selectMemu(state, val){
            if(val.name !== 'home'){
                state.currentMemu = val
                const result = state.tabslist.findIndex(item => item.name === val.name)
                if(result === -1){
                    state.tabslist.push(val)
                }
            }else{
                    state.currentMemu = null
            }
        },
        setMenu(state,val) {
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))

        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')

        },
        addMenu(state,router) {
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children) {
                    item.children = item.children.map(item =>{
                        item.component = () => import(`../view/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else {
                    item.component = () => import(`../view/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    }
  
}