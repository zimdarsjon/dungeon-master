import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', () => {
  
    const menuItems = ref<any[]>([
        {
            label: 'Home',
            icon: 'pi pi-home',
            route: '/'
        },
        {
            label: 'Combat',
            icon: 'pi pi-flag',
            route: '/combat'
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Monsters',
                    icon: 'pi pi-bolt',
                    route: '/search'
                },
                {
                    label: 'Classes',
                    icon: 'pi pi-server'
                },
                {
                    label: 'Races',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ]);


    return {
        menuItems
    }
        
})