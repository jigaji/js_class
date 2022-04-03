class Good {
    constructor(id, name, description, sizes, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
    }

    setAvailable(value) {
        this.available = value;
    }
}



class GoodsList {
    #goods = [];
    constructor (filter, sortPrice, sortDir) { 
        this.filter = filter === undefined ? /./i: filter;
        this.sortDir = sortDir === undefined ? false: sortDir;
        this.sortPrice = sortPrice === undefined ? false: sortPrice;
    }
    
    get list() {
        let result = this.#goods.filter(good => this.filter.test(good.name));
        if(!this.sortPrice){
            return result;
        }
        if(this.sortDir){
            return result.sort((good_1, good_2) => good_1.price - good_2.price); 
        }
        return result.sort((good_1, good_2) => good_2.price - good_1.price);
    }

    add (good){
        this.#goods.push(good);
    }

    remove(id){
        let index = this.#goods.findIndex(good => good.id === id);
        if (index ===-1) {
            return console.log("Такого id нет в каталоге")
        }
        this.#goods.splice(index, 1);
    }
}

class BasketGood extends Good {
    constructor (id, name, description, sizes, price, amount) {
        super(id, name, description, sizes, price);
        this.amount = amount;
    }
}

class Basket {
    constructor () {
        this.goods = [];
    }

    get totalAmount() {
        return this.goods.reduce((total, current) => total + current.amount, 0);
    }

    get totalSum() {
        return this.goods.reduce((total, current) => total + current.amount * current.price, 0);  
    }


    add(good, amount) {
        let index = this.goods.findIndex(el => el.id === good.id);
        if (index ===-1) {
                this.goods.push(good);
                good.amount += amount;
        } else this.goods[index].amount += amount;
    }

    remove(good, amount) {
        let index = this.goods.findIndex(el => el.id === good.id);
        if (index ===-1) {
                console.log("Такого товара нет в корзине");
        } else this.goods[index].amount -= amount;
        
        if (this.goods[index].amount <= 0) {
            this.goods.splice(index, 1);
        }
    }
    
    clear() {
        this.goods = [];
    }

    removeUnavailable() {
        this.goods = this.goods.filter(el => el.available);
    }
}




let good = [ new Good (1, 'Рубашка', 'Хлопковая', [36, 48, 54], 1500),
             new Good (2, 'Джинсы', 'Прямые', [40, 44, 46], 2000),
             new Good (3, 'Юбка', 'Миди', [36, 38], 1700),
             new Good (4, 'Пальто', 'Кашемировое', [40, 42, 44, 46, 48, 50, 52, 54], 8000),
             new Good (5, 'Брюки', 'Широкие', [46, 48, 50], 2000)
];

good[0].setAvailable(true);
good[1].setAvailable(true);
good[2].setAvailable(false);
good[3].setAvailable(true);
good[4].setAvailable(false);
console.log(good)

let goodsList = new GoodsList();
goodsList.add(good[0]);
goodsList.add(good[1]);
goodsList.add(good[2]);
goodsList.add(good[3]);
goodsList.add(good[4]);
console.log(goodsList.list);

// goodsList.filter = /Руб/i;
console.log(goodsList.list);

goodsList.remove(5)
console.log(goodsList.list)

goodsList.filter = /./i;
goodsList.sortPrice = true;
goodsList.sortDir = true;
console.log(goodsList.list);

let basketGood = [new BasketGood (1, 'Рубашка', 'Хлопковая', [36, 48, 54], 1500, 0),
                  new BasketGood (2, 'Джинсы', 'Прямые', [40, 44, 46], 2000, 0),
                  new BasketGood (3, 'Юбка', 'Миди', [36, 38], 1700, 0),
                  new BasketGood (4, 'Пальто', 'Кашемировое', [40, 42, 44, 46, 48, 50, 52, 54], 8000, 0),
                  new BasketGood (5, 'Брюки', 'Широкие', [46, 48, 50], 2000, 0)
];
basketGood[0].setAvailable(true);
basketGood[1].setAvailable(true);
basketGood[2].setAvailable(true);
basketGood[3].setAvailable(true);
basketGood[4].setAvailable(false);

let basket = new Basket;

basket.add(basketGood[0], 5);
basket.add(basketGood[1], 10);
basket.add(basketGood[4], 3);
basket.add(basketGood[2], 13);
console.log(basket);

basket.removeUnavailable();
console.log(basket);

basket.remove(basketGood[0], 15);
basket.remove(basketGood[1], 1);
console.log(basket);
console.log(basket.totalAmount, basket.totalSum);

basket.clear();
console.log(basket);



