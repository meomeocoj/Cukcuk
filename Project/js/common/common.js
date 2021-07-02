function formatDate(value){
return value.toLocaleString().slice(0,10);
}
function formatMoney(value){
return value.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
