import Model from './Model';

class Property extends Model {


    constructor(modelTable = 'property') {
        super(modelTable);
        this.table = modelTable;


    }

    static init() {
        return new Property();
    }
}

export default Property;