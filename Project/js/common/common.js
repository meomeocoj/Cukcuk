/** *************************8
 * Formater Class
 * Created by ntminh
 * Date:8/7/2021
 */
class Formater{
    static formatGenderToServer(value){
        if(value == "Nam"){
            return 1;
        }else if(value == "Nữ"){
            return 2;
        }else return 3;
    }
    static formatMoneyToServer(value){
        if(value){
            return value.toString().replaceAll('.','');
        }
        else return '';
    }
    static formatDateToClient(value){
        let date = new Date(value);
        let newDate = date.getDate();
        let newMonth= date.getMonth() + 1;
        let newYear = date.getFullYear();
        return '' + newDate + '/' + newMonth + '/' + newYear;    
    }
    static formatMoneyToClient(value){
        if(value){
            return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }else return '';    
    }
}
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
