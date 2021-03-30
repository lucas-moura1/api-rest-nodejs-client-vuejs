const {
    PORT,
    DB_MONGODB_DOMAIN,
    NODE_ENV,
    LOGGER_LEVEL
} = process.env

const IS_TEST = NODE_ENV === 'test'

const dataBaseName = {
    test: process.env.DB_MONGODB_NAME_TEST,
    development: process.env.DB_MONGODB_NAME
}[NODE_ENV]

const dataBaseUrl =`${DB_MONGODB_DOMAIN}/${dataBaseName}`

const dataBaseConfig = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}

module.exports = {
    PORT,
    dataBaseUrl,
    dataBaseConfig,
    IS_TEST,
    LOGGER_LEVEL
}
