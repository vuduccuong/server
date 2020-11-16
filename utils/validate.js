
const func1 = ()=>{
console.log("function 1");
};

const func2 = ()=>{
    console.log("function 2");
};

const valid = (name, email, password) => {
    if(!name || !email || !password) return false;
    return true;
};

const validPost = (title, body) =>{
    if(!title || !body){
        return false;
    };
    return true;
}

module.exports = {
    func1: func1,
    func2: func2,
    vaild: valid,
    validPost:validPost
}