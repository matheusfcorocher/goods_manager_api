const Resource = require('../../../domain/entities/Resource');

const SequelizeResourceMapper = {
    toEntity(dataValues) {
        const {id, name, weight} = dataValues;

        return new Resource({id, name, weight});
    }
}

module.exports = SequelizeResourceMapper;