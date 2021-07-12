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
    get ApiName() {
        return this._ApiName;
    }
    set ApiName(ApiName) {
        this._ApiName = ApiName;
    }

    initiateEvents() {
        let me = this;
        //autofocus when show;
        $('#btnAdd').click(function () {
            //display the add dialog;
            let dialogContainer = $('.dialog-container');
            dialogContainer.data('typeForm', 'add');
            dialogContainer.find('input').val('');
            dialogContainer.show(500);
            dialogContainer.find('input')[0].focus();
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
            if ($('.dialog-container').data('typeForm') == 'add') {
                let newEmployee = Dialog.addDialog();
                if (newEmployee) {
                    me.add(newEmployee);
                }
            } else {
                me.edit();

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
                    $(this).attr('validate', 'false');
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
        /****************
         * Validate form information
         * Created by ntminh
         * Date: 30/6/2021
         * Modified date: 9/7/2021
         */
        //validate the identity number
        $('#idenity-number').on({
            keyup: function () {
                let value = $(this).val();
                if (value && !value.match(/^\d*$/)) {
                    $(this).addClass('border-red');
                    $(this).attr('validate', 'false');
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
                    let formartMoney = Formater.formatMoneyToClient(res);
                    $(this).val(formartMoney);
                    $(this).removeClass('border-red');
                }
            },
        });
        /**
         * View 1 record in the form
         * Created by ntminh
         * Date: 9/7/2021
         */
        $('table tbody').on('dblclick', 'tr', function (e) {
             $.ajax({
                url: `http://${me.Host}/${me.ApiName}/${$(this).data('EmployeeId')}`,
                method: 'GET',
            }).done((res) => {
                let editDialog = $('.dialog-container');
                let inputs = editDialog.find('input');
                editDialog.data('typeForm', 'edit');
                editDialog.data('EmployeeId', $(this).data('EmployeeId'));
                $(inputs).each(function () {
                    let value = res[$(this).attr('fieldname')];
                    if ($(this).attr('type') === 'date') {
                        value = Formater.formatDateToInput(value);
                    } else if ($(this).attr('fieldname') === 'Salary') {
                        value = Formater.formatMoneyToClient(value);
                    } else if ($(this).attr('fieldname') === 'Gender') {
                        value = Formater.formatGenderToClient(value);
                    }
                    $(this).val(value);
                });
                editDialog.show(500);
            }).fail((res) => {
                console.log(-1);
            });
        });
        //EVENT CLICK DELETE BTN
        $('table tbody').on('click', '.delete-btn', function (e) {
            let employeeId = $(this).parent().parent().data('EmployeeId');
            me.delete(employeeId);
        })

    }
//#region API
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
                    tr.data("EmployeeId", obj.EmployeeId);
                    $.each(tableThs, (i, o) => {
                        let fieldName = $(o).attr('fieldname');
                        let td = $('<td style="text-align:center;vertical-align:middle"></td>');
                        let value = obj[fieldName];
                        if (fieldName == "DateOfBirth") {
                            value = Formater.formatDateToClient(value);
                        } else if (fieldName == "Salary") {
                            value = Formater.formatMoneyToClient(value);
                        } else if (fieldName == "WorkStatus") {
                            if (value > 0) {
                                value = $('<input type="checkbox" checked onclick="this.checked=!this.checked"/>');
                            }
                            else {
                                value = $('<input type="checkbox" onclick="this.checked=!this.checked"/>');
                            }
                        } else if (fieldName == "DeleteBtn") {
                            value = $('<img src="/Project/Resource/icon/delete.png" class="delete-btn">');
                        } else if (fieldName == "Gender") {
                            value = Formater.formatGenderToClient(value);
                        }
                        td.append(value);
                        tr.append(td);
                    })
                    tbody.append(tr);
                })
            }).fail(() => {
                alert('fail');
            });
        } catch (e) {
            console.log(e);
        }

    }
    /**
     * PUT from API
     * Created by ntminh
     * Date: 9/7/2021
     */
    add(newEmployee) {
        let me = this;
        try {
            $.ajax({
                url: `http://${me.Host}/${me.ApiName}`,
                method: 'POST',
                contentType: "application/json ; charset=utf-8",
                data: JSON.stringify(newEmployee),       
            }).done(function (res) {
                $('.close-btn').trigger('click');
                me.loadData();
            }).fail(function () {
                err
                console.log(err);
            });
        } catch (e) {
            console.log(e);
        }
    }
    edit() {
        let me = this;
        let newEmployee = Dialog.addDialog();
        if (newEmployee) {
            try{
               var res =  $.ajax({
                    url: `http://${me.Host}/${me.ApiName}/${$('.dialog-container').data('EmployeeId')}`,
                    method: 'PUT',
                    contentType: "application/json ; charset=utf-8",
                    data: JSON.stringify(newEmployee),
                }).done((res) => {
                    $('.close-btn').trigger('click');
                    me.loadData();
                }).fail((err) => {
                    console.log(err);
                });
            }catch(e){
                console.log(e);
            }
        }
    }
    /**
     * DELETE from API
     * @param id - entityID
     * Created by ntminh
     * Date: 9/7/2021
     */
    delete(id) {
        let me = this;
        $.ajax({
            url: `http://${me.Host}/${me.ApiName}/${id}`,
            method: `DELETE`,
        }).done((res) => {
            me.loadData();
            console.log(res);
        }).fail((err) => {
            console.log(err);
        })
    }
    ////#endregion
    //#endregion
}
