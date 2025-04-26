import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useWordMenuStore = defineStore('world-menu', () => {
  
    const menuItems = ref<any[]>([
        {
            label: 'Gods',
            icon: 'pi pi-globe',
            items: [
                {
                    label: 'Ambriel',
                    icon: 'pi pi-bolt',
                },
                {
                    label: 'Bellis',
                    icon: 'pi pi-bolt',
                },
                {
                    label: 'Nuriel',
                    icon: 'pi pi-bolt',
                },
            ]
        },
        {
            label: 'Countries',
            icon: 'pi pi-flag',
            items: [
                {
                    label: 'Ashan',
                    to: 'ashan'
                },
                {
                    label: 'Blackburn',
                    to: 'blackburn'
                },
                {
                    label: 'Cauldera',
                    to: 'cauldera'
                },
                {
                    label: 'Copper Coast',
                    to: 'coppercoast'
                },
                {
                    label: 'Ferran',
                    to: 'ferran'
                },
                {
                    label: 'Odarris',
                    to: 'odarris'
                },
                {
                    label: 'Umbria',
                    to: 'umbria',
                    items: [
                        {
                            label: 'The Lovers',
                        },
                        {
                            label: 'Targona\'s Folly',
                        },
                        {
                            label: 'Merchant\'s Rest',
                        },
                        {
                            label: 'Tidemount',
                        },
                        {
                            label: 'Birchmere',
                        },
                        {
                            label: 'Mythrun',
                        },
                        {
                            label: 'Ravenholm',
                        },
                    ]
                },
                {
                    label: 'Zamir',
                    to: 'zamir'
                },

            ]
        },
    ]);


    return {
        menuItems
    }
        
})