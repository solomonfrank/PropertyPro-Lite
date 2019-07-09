
import Model from './Model';

class User extends Model {
    constructor(modelType = 'users') {
        super(modelType);
        this.table = modelType;
    }

    static init() {
        return new User();
    }

    async findByEmail(param) {
        return super.find(param);
    }


}


export default User;
