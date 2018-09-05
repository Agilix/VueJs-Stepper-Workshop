import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Onboarding/Start'
import Information from '@/components/Onboarding/Information'
import Description from '@/components/Onboarding/Description'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'step_0',
            component: Start
        },
        {
            path: '/info',
            name: 'step_1',
            component: Information
        },
        {
            path: '/description',
            name: 'step_2',
            component: Description
        },
        {
            path: '*',
            name: 'not_found',
            component: Vue.component('not_found', {
                template: `<div><h1>woops, not found</h1><br><router-link :to="{name: 'step_0'}">Back</router-link></div>`
            })
        }

        /*,
       {
           path: '/sectors',
           name: 'step_3',
           component: Sectors
       },

           path: '/logo',
           name: 'step_4',
           component: Logo
       }, */

    ]
})
