export default class CollectionFilter {
    constructor(objects, params, model) {
        this.objects = objects;
        this.model = model;
        this.params = params;
    }

    get() {

        if (this.params == null) {
            return this.objects;
        }
        else {
            //return this.Filter();
            return this.Sort();
        }
    }

    Sort() {
        let key = Object.values(this.params)[0];
        return this.objects.sort((a, b) => innerCompare(a, b));
    }

    limitOffset() {

    }

    Filter() {

        let results = [];
        let key = Object.keys(this.params)[0];
        let value = [];
        let searchValue = this.params[key];
        let i = 0;
        for (let obj of this.objects) {
            value.push(obj[key]);
            if (value[i].toLowerCase().startsWith(searchValue.toLowerCase().replace("*", "")) && searchValue.startsWith("*") && !searchValue.endsWith("*")) {
                results.push(obj);
            }
            if (value[i].toLowerCase().endsWith(searchValue.toLowerCase().replace("*", "")) && !searchValue.startsWith("*") && searchValue.endsWith("*")) {
                results.push(obj);
            }
            if (value[i].toLowerCase().includes(searchValue.toLowerCase().replace("*", "")) && searchValue.startsWith("*") && searchValue.endsWith("*")) {
                results.push(obj);
            }
            if (value[i].toLowerCase().includes(searchValue.toLowerCase()) && !searchValue.startsWith("*") && !searchValue.endsWith("*")) {
                results.push(obj);
            }
            i++;
        }
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