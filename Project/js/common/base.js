class Base {
    Host = "cukcuk.manhnv.net/v1";
    constructor(ApiName) {
        this.ApiName = ApiName;
        this.initiateEvents();
        this.loadData();
    }
    //#region Method
    /**
     *Intitiate Events
     * Created by ntminh
     * Date:30/6/2012
     */
    //set & get ApiName 
    get ApiName(){
        return this._ApiName;
    }
    set ApiName(ApiName){
        this._ApiName = ApiName;
    }

    initiateEvents() {
        let me = this;
        //autofocus when show;
        $('#btnAdd').click(function () {
            //display the add dialog;
            $('.dialog-container').show(500);
            $('#employee-id').focus();
        })
        //close the add dialog
        $('.close-btn').click(function () {
            $('.dialog-container').hide(500);
            $('.must-fill-input').removeClass('border-red');
        })
        $('#btnCancel').click(function () {
            $('.dialog-container').hide();
            $('.must-fill-input').removeClass('border-red');
        })
        //reload data
        $('#btnRefresh').click(function () {
            me.loadData();
        })
        /**
        *Add 1 record to the server by addBtn
        * Created by ntminh
        * Date:6/7/2012
        */
        //add function
        $('#btnSave').click(function () {
            //Generate new employee
            let flag = true;
            let newEmployee = {};
            //search required data
            $('.dialog-container').find('input[required]').each(function () {
                if ($(this).attr('validate') == 'false') {
                    $(this).trigger('blur');
                    $(this).focus();
                    flag = false;
                } else {
                    if($(this).attr('fieldname') === "FullName"){
                        let fullName = $(this).val().split(" ");
                        newEmployee['LastName'] = fullName[0];
                        newEmployee['FirstName'] = fullName[fullName.length -1];
                    }
                    newEmployee[$(this).attr('fieldname')] = $(this).val();
                }
            });
            if(!flag) {
                $('.dialog-container').find('input[required]')[0].focus;
            }
            else{
                //search another input
                $('.dialog-container').find('input').each(function () {
                    if (!$(this).prop('required')) {
                        let value = $(this).val();
                        if($(this).attr('fieldname') === "Salary"){
                            value = Formater.formatMoneyToServer(value);
                        }else if($(this).attr('fieldname') === "Gender"){
                            value = Formater.formatGenderToServer(value);
                        } 
                        if(value)
                        newEmployee[$(this).attr('fieldname')] = value;
                    }
                });
                console.log(JSON.stringify(newEmployee));
                try {
                    $.ajax({
                        url: `http://${me.Host}/${me.ApiName}`,
                        method: 'POST',
                        contentType: "application/json ; charset=utf-8",
                        data: JSON.stringify(newEmployee),
                    }).done(function(res){
                        console.log(res);
                    }).fail(function(res){
                        console.log(res);
                    });
                }catch (e) {
                    console.log(e);
                }
            }
        });
        //must fill label
        $('.must-fill').append("(<span style='color:red;'>*</span>)");
        //must fill field
        $('.must-fill-input').on({
            blur: function () {
                let value = $(this).val();
                if (!value) {
                    $(this).addClass('border-red');
                } else {
                    $(this).removeClass('border-red');
                    $(this).attr('validate', 'true');
                }
            },
            keyup: function () {
                let value = $(this).val();
                if (!value) {
                    $(this).removeClass('border-red');
                    $(this).attr('validate', 'true');
                }
            }
        });
        //validate the identity number
        $('#idenity-number').on({
            keyup: function () {
                let value = $(this).val();
                if (value && !value.match(/^\d*$/)) {
                    $(this).addClass('border-red');
                } else {
                    $(this).removeClass('border-red');
                    $(this).attr('validate', 'true');
                }
            },
            blur: function () {
                let value = $(this).val();
                if (!value || !value.match(/^(\d{10}|\d{12})$/)) {
                    $(this).addClass('border-red');
                    $(this).attr('validate', 'false');
                } else {
                    $(this).removeClass('border-red');
                    $(this).attr('validate', 'true');
                }
            }
        });
        //validate the email
        $('#email').on({
            blur: function () {
                let value = $(this).val();
                if (!value || !value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    $(this).addClass('border-red');
                    $(this).attr('validate', 'false');
                } else {
                    $(this).removeClass('border-red');
                    $(this).attr('validate', 'true');
                }
            }
        });
        //validate the phone number
        $('#phone-number').on({
            blur: function () {
                let value = $(this).val();
                console.log(value.match(/((09|03|07|08|05)+([0-9]{8})\b)/g));
                if (!value || !value.match(/((09|03|07|08|05)+([0-9]{8})\b)/g)) {
                    $(this).addClass('border-red');
                    $(this).attr('validate', 'false');
                } else {
                    $(this).removeClass('border-red');
                    $(this).attr('validate', 'true');
                }
            },
            keyup: function () {
                let value = $(this).val();
                if (value && !value.match(/^\d*$/)) {
                    $(this).attr('validate', 'false');
                    $(this).addClass('border-red');
                } else {
                    $(this).removeClass('border-red');
                }
            }
        });
        //format the salary input
        $("#salary").on({
            keyup: function () {
                let value = $(this).val();
                let res = value.replace(/\./g, '');
                if (value && !res.match(/^\d*$/)) {
                    $(this).attr('validate', 'false');
                    $(this).addClass('border-red');
                } else {
                    let formartMoney = formatMoney(res);
                    $(this).val(formartMoney);
                    $(this).removeClass('border-red');
                }
            },
        });
    }
    /**
     *Load data from API
     * Created by ntminh
     * Date:5/7/2012
     */
    loadData() {
        let me = this;
        try {
            $.ajax({
                url: `http://${me.Host}/${me.ApiName}`,
                method: "GET"
            }).done((res) => {
                //fetch data
                let tableThs = $("table thead th");
                let tbody = $('table tbody');
                tbody.empty();
                //bindin data
                $.each(res, (index, obj) => {
                    let tr = $("<tr></tr>");
                    $.each(tableThs, (i, o) => {
                        let fieldName = $(o).attr('fieldname');
                        let td = $('<td style="text-align:center;vertical-align:middle"></td>');
                        let value = obj[fieldName];
                        if (fieldName == "DateOfBirth") {
                            value = Formater.formatDateToClient(value);
                        } else if (fieldName == "Salary") {
                            value = Formater.formatMoneyToClient(value);
                        } else if (fieldName == "WorkStatus"){
                            if (value > 0){
                                value = $('<input type="checkbox" checked onclick="this.checked=!this.checked"/>');
                            }
                            else{
                                value = $('<input type="checkbox" onclick="this.checked=!this.checked"/>');
                            }
                        } else if(fieldName == "DeleteBtn"){
                            value = $('<div style="dis"><img>')
                        }
                        td.append(value);
                        tr.append(td);
                    })
                    tbody.append(tr);
                })
            }).fail(() => {
                alert('fail');
            });
        }catch (e) {
            console.log(e);
        }
        
    }
    //#endregion
}