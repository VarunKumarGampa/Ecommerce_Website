class customError extends error{
    constructor(message,error){
        super(message);
        this.code = code;
    }
}

export default customError;