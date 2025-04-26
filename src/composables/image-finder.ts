import type { APIMonster, Open5eMonster } from "@/models";

const slugImagePaths : Record<string, string> = {
    'adult-black-dragon-a5e': 'https://writingdragons.com/wp-content/uploads/2016/03/black-dragon-by-kekai-kotaki.jpg?w=700',
    'adult-black-dragon' : 'https://writingdragons.com/wp-content/uploads/2016/03/black-dragon-by-kekai-kotaki.jpg?w=700',
    'naina': '/naina.png'
};

const typeImagePaths : Record<string, string> = {
    'dragon': 'https://icv2.com/images/article_thumbs/650x650_206ae954a15e30fbab937724b734b9281cc9165ae6bdcd5f9e41457f.jpg',
    'dumanoid': 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2025/02/dungeons-dragons-bandits-raiding-a-tavern-by-katerina-ladon.jpg',
    'dndead': 'https://i0.wp.com/dmdave.com/wp-content/uploads/2018/11/skeletons.jpg?fit=800%2C450&ssl=1',
    'deast': 'https://i.ytimg.com/vi/2wOZ2mb7_9M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDBPDwIcb9rXHM0ju2T0nhcf1Ar4g'
};


export function useImageHelpers() {

    function findOpenMonsterImagePath (monster: Open5eMonster) {
        console.log(monster)

        if (slugImagePaths[monster.slug]) {
            console.log(slugImagePaths[monster.slug])
            return slugImagePaths[monster.slug];
        } else if (typeImagePaths[monster.type.toLowerCase()]) {
            return typeImagePaths[monster.type.toLowerCase()];
        } else {
            return ''
        }
    };

    function findBaseMonsterImagePath (monster: APIMonster) {

        if (slugImagePaths[monster.index]) {
            return slugImagePaths[monster.index];
        } else if (typeImagePaths[monster.type.toLowerCase()]) {
            return typeImagePaths[monster.type.toLowerCase()];
        } else {
            return `https://www.dnd5eapi.co${monster.image}`
        }
    }

    function getAllImages () {
        const slugUrls = Object.values(slugImagePaths);
        const typeUrls = Object.values(typeImagePaths);

        // Use a Set to eliminate duplicates and convert it back to an array
        const allUrls = [...slugUrls, ...typeUrls];
        const uniqueUrls = Array.from(new Set(allUrls));

        return uniqueUrls;
    }

    return {
        findOpenMonsterImagePath,
        getAllImages,
        findBaseMonsterImagePath
    }
}