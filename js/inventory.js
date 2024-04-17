//INVENTARIO TESTING  NO METER 
let bolas = false;
if(localStorage.getItem('bolas')){
    console.log("Ya tienes bolas");
}else{
    localStorage.setItem('bolas', JSON.stringify(bolas));
}