export default class CollectionFilter {
    constructor(objects, params, model) {
        this.objects = objects;
        this.model = model;
        this.params = params;
    }

    get() {

        if (this.params == null) {
            return this.params;
        }
        else {
            this.Filter();
        }
    }

    sort() {

    }

    limitOffset() {

    }

    Filter() {
        const results = this.objects.filter(obj => JSON.stringify(obj).toLowerCase().includes(this.params.value, 1));
        return results;
    }

    fields() {

    }
}



function valueMatch(value, searchValue) {
    try {
        let exp = '^' + searchValue.toLowerCase().replace(/\*/g, '.*') + '$';
        return new RegExp(exp).test(value.toString().toLowerCase());
    } catch (error) {
        console.log(error);
        return false;
    }
}
function compareNum(x, y) {
    if (x === y) return 0;
    else if (x < y) return -1;
    return 1;
}

function innerCompare(x, y) {
    if ((typeof x) === 'string')
        return x.localeCompare(y);
    else
        return this.compareNum(x, y);
}