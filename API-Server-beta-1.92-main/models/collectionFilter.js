import Model from './model.js';

export default class CollectionFilter extends Model {
    constructor(objects, params, model) {
        this.objects = objects;
        this.model = model;
        this.params = params;
    }

    get() {

    }
}