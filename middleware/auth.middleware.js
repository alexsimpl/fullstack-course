const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {     //проверяет доступность сервера
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] //"Bearer TOKEN"
        
        if(!token) {
            return res.status(401).json({message: 'Нет авторизации'})   // return - чтобы код дальше не выполнялся
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))  //раскодирование токена по серкретному ключу, который использовался для его кодировки (config=> default.json)
        req.user = decoder
        next()
    } catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}