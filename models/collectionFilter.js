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
            if (this.params.fields != null) {
                return this.Fields();
            }
            if (this.params.limit != null && this.params.offset != null) {
                return this.LimitOffset();
            }
            if (this.params.sort != null) {
                return this.Sort();
            }
            else {
                return this.Filter();
            }
        }
    }

    Sort() {
        let key = Object.values(this.params)[0];
        return this.objects.sort((a, b) => innerCompare(a[key], b[key]));
    }

    LimitOffset() {
        const limit = this.params.limit ? parseInt(this.params.limit) : undefined;
        const offset = this.params.offset ? parseInt(this.params.offset) : 0;

        return this.objects.slice(offset, limit);
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

    Fields() {
        let results = [];
        let key = Object.values(this.params)[0];
        let previousValue;
        for (let obj of this.objects) {
            if (previousValue != obj[key]) {
                let resultObj = {};
                resultObj[key] = previousValue;
                results.push(resultObj);
            }
            previousValue = obj[key];
        }
        return results;
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
        return compareNum(x, y);
}