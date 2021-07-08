/*************************************
 * New method for dropdown-list
 * Created by ntminh
 * Date: 6/7/2021
*/
function dropdownHandler(dropdown){
    let items = dropdown.find('.item');
    let input = dropdown.find('input');
    let arrow = dropdown.find('.arrow');
    arrow.click(function(e){
        e.stopPropagation();
        $(this).parent().find('.department-name').focus();
        $(this).parent().find('.dropdown-list').slideToggle(250,"linear").addClass('dropdown-list-active');
        $(this).toggleClass('arrow-click');
        return true;
    })
    items.each(function(){
        $(this).click(function(e) {
            e.stopPropagation();
            $(this).parent().parent().find('input').val($(this).text().trim());
            $(this).siblings().removeClass('item-active');
            $(this).siblings().find('i').css('visibility', 'hidden');
            $(this).addClass('item-active').find('i').css('visibility','visible');;
            // $(this)
            $(this).parent().slideToggle(250,"linear").parent().find('.arrow').toggleClass('arrow-click');;
        })
    })
    input.val($(items[0]).text().trim());
    $(items[0]).addClass('item-active').find('i').css('visibility', 'visible');
    $(document).click(function(e){
        e.stopPropagation();
        if(!($(e.target).hasClass('dropdown-wrapper'))
            && !($(e.target).hasClass('department-name'))
            && !($(e.target).hasClass('.arrow'))){
            dropdown.find('.dropdown-list').slideUp(250,"linear");
            dropdown.find('.arrow').removeClass('arrow-click');
        }
    })
}
dropdownHandler($('#dropdown-header')); 
dropdownHandler($('#department-filter'));
// let dropdownHeader = new Dropdown($('#dropdown-header'));
