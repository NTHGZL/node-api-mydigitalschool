const loggerMiddleware = (request, response, next) => {
    
    if(request){
        console.info(
            `Requête ${request.method} reçue de ${request.ip} à destination de ${request.url}`
        )
    }

    // if(response){
    //     console.info(
    //         `Réponse ${response}`
    //     )

    // }
    next()
    
}

module.exports = Logger = loggerMiddleware;