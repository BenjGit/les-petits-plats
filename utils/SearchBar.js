export default class SearchBar{
    constructor(items){
        this.input = document.getElementById('search-bar').value; // récupérer l'entrée de l'utilisateur
        this.items = items;
        this.Search();
    }

    normalize(str) {
        const map = {
            '-': ' ',
            'a': 'á|à|ã|â|À|Á|Ã|Â',
            'e': 'é|è|ê|É|È|Ê',
            'i': 'í|ì|î|Í|Ì|Î',
            'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c': 'ç|Ç',
            'n': 'ñ|Ñ'
        };

        for (let pattern in map) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        };

        return str;
    }

    Search(){
        if(this.input.length >= 3){
            const inputNormalized = this.normalize(this.input.toLowerCase());

            const filteredItems = this.items.filter(item => {
                const itemNormalized = this.normalize(item.toLowerCase());
                return itemNormalized.includes(inputNormalized);
            });
            
            if(filteredItems.length > 0){
                console.log(filteredItems);
            }
            else{
                console.log("Aucun élément trouvé.");
            } 
        }
        else{
            console.log("Veuillez entrer plus de 3 caractères");
        }
    }

}