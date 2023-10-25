
function validatorHandler(schema, property){

    return (req, res, next) =>{
        const data = req[property];
        // console.log(data);
        const { error } = schema.validate(data);
        // console.log(error);
        if(error){
            next(error)
        }
        next();
    }
}



module.exports = validatorHandler;