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
        newDate = newDate < 10 ? "0" + newDate : newDate;
        newMonth = newMonth < 10 ? "0" + newMonth : newMonth;
        return '' + newDate + '/' + newMonth + '/' + newYear;    
    }
    static formatMoneyToClient(value){
        if(value){
            return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }else return '';    
    }
    static formatGenderToClient(value){
        if(value==1){
            return "Nam";
        }else if(value == 2){
            return "Nu";
        }else return "Khac";
    }
}
