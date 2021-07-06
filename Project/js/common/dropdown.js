/*************************************
 * New method for dropdown-list
 * Created by ntminh
 * Date: 6/7/2021
*/
jQuery.fn.extend({
    dropdown: function(){
        return this.each(function(){
            
        })
    }
});
$('.arrow').dropdown();
$('.arrow').click(function(e){
    e.stopPropagation();
    $(this).parent().find('.department-name').focus();
    $(this).parent().find('.dropdown-list').slideToggle(250,"linear");
    $(this).toggleClass('arrow-click');
});
$('.dropdown-wrapper .dropdown-list .item').click(function(e){
    e.stopPropagation();
    $(this).parent().parent().find('.department-name').val($(this).text());
    $(this).siblings().css({'background-color':'#fff','color':'#000'});
    $(this).css({'background-color':'#019160','color':'#fff'});
    $(this).parent().slideToggle(250,"linear");
    $(this).parent().parent().find('.arrow').toggleClass('arrow-click');
});
