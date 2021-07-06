function formatDate(value){
    let date = new Date(value);
    let newDate = date.getDate();
    let newMonth= date.getMonth() + 1;
    let newYear = date.getFullYear();
return '' + newDate + '/' + newMonth + '/' + newYear;
}
function formatMoney(value){
    if(value){
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }else return '';   
}
function unchageCheckbox(){
    
}
