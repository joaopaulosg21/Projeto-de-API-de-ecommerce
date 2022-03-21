function checkUser(obj){
    const myPromise = new Promise((resolve,reject)=>{
        if(obj.name !== " " && obj.name !=="" && obj.username!== " " && obj.username!== "" && obj.password !== " " && obj.password !== ""){
            resolve(true)
        }else{
            reject(`Nenhum campo pode estar vazio`)
        }
    })
    
    return myPromise
}

function checkAdress(obj){
    const myPromise = new Promise((resolve,reject)=>{
        if(obj.city !== " " && obj.state !=="" && obj.country!== " " && obj.city!== "" && obj.state !== " " && obj.country !== ""){
            resolve(true)
        }else{
            reject(`Nenhum campo pode estar vazio`)
        }
    })
    
    return myPromise
}


export default {checkUser,checkAdress}