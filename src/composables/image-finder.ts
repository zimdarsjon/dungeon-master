import type { Monster } from "@/models";

const slugImagePaths : Record<string, string> = {
    'adult-black-dragon-a5e': 'https://writingdragons.com/wp-content/uploads/2016/03/black-dragon-by-kekai-kotaki.jpg?w=700',
    'adult-black-dragon' : 'https://writingdragons.com/wp-content/uploads/2016/03/black-dragon-by-kekai-kotaki.jpg?w=700'
};

const typeImagePaths : Record<string, string> = {
    'Dragon': 'https://icv2.com/images/article_thumbs/650x650_206ae954a15e30fbab937724b734b9281cc9165ae6bdcd5f9e41457f.jpg',
    'Humanoid': 'https://i.pinimg.com/474x/35/15/10/3515107f47035ebbd8e5377eb4410eda.jpg'
};


export function useImageHelpers() {

    function findMonsterImagePath (monster: Monster) {

        if (slugImagePaths[monster.slug]) {
            return slugImagePaths[monster.slug];
        } else if (typeImagePaths[monster.type]) {
            return typeImagePaths[monster.type];
        } else {
            return ''
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
        findMonsterImagePath,
        getAllImages
    }
}