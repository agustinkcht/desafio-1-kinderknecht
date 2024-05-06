class Manager {
    constructor(Model) {
        this.Model = Model;
    };
    async create(data) {
        try {
            const one = await this.Model.create(data)
            return one;
        } catch(err) {
            throw err;
        };
    };
    async read(filter) {
        try {
            const all = await this.Model.find(filter);
            return all;
        } catch(err) {
            throw err;
        };
    };
    async readOne(id) {
        try {
            const one = await this.Model.findOne({ _id: id });
            return one;
        } catch(err) {
            throw err;
        };
    };
    async update(id, data) {
        try {
            const one = await this.Model.findByIdAndUpdate(id, data, { new: true });
            return one;    
        } catch(err) {
            throw err;
        };
    };
    async destroy(id) {
        try {
            const one = await this.Model.findByIdAndDelete(id);
            return one;
        } catch(err) {
            throw err;
        };
    };
};

export default Manager;