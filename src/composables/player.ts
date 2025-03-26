import type { StagedPlayer } from "@/models";

export function usePlayerHelpers() {

    function getAllPlayers () {

        return [
            {
                id: 1,
                name: 'Kroktos',
                image: 'https://i.pinimg.com/736x/7a/fe/fd/7afefd9d44c14cbf77af787776b45dd0.jpg'
            },
            {
                id: 2,
                name: 'Kharmir',
                image: 'https://i0.wp.com/dungeonsanddragonsfan.com/wp-content/uploads/2024/09/2024-dnd-dwarf-species-1.png?fit=800%2C450&ssl=1'
            },
            {
                id: 3,
                name: 'Sam',
                image: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2023/03/chris-pine-edgin-bard-mtg.jpg'
            },
            {
                id: 4,
                name: 'Tinnim',
                image: 'https://arcaneeye.com/wp-content/uploads/2021/04/archelos-lagoon-mystic_icon.jpg'
            },
            {
                id: 5,
                name: 'Dannish',
                image: 'https://www.wargamer.com/wp-content/sites/wargamer/2022/06/dnd-elf-5e-high-elf.jpg'
            },
            {
                id: 6,
                name: 'Mira',
                image: 'https://articles.dndnames.com/wp-content/uploads/2023/10/best-ranger-species-firbolg-1024x512.png'
            }
        ] as StagedPlayer[];
    }

    return {
        getAllPlayers
    }
}