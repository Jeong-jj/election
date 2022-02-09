function abc(sdName){
    $.ajax({
        type:'GET',
        url:`https://park220209.herokuapp.com/http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire?serviceKey=fV%2F85hdPkRBbhHO%2FJMrJbwuYtZpTjYbDEouGpgyB4bhZqyal1o2mv9jLJX%2BFOMPw1U%2Be966nl32WWFqaV9LeUg%3D%3D&pageNo=1&numOfRows=10&sgId=20220309&sdName=${sdName}`,
        dataType:'xml',
        beforeSend: function() {    // send() 수행전(값이 오기전) 먼저 수행할 함수
            $('#content').append(`<div class="loading"><i class="fa-solid fa-spinner fa-spin"></i></div>`) // class에 fa-spin을 추가하면 회전됨
        },
        complete: function() {  // send()가 수행된 후 실행될 함수
            $('#content .loading').remove()
        },
        success:function(getdata){
            console.log(getdata)
            usedata(getdata)
        },
        error:function(xhr){
            console.log(xhr.status + '/' + xhr.errorText) 
        }
    })
}
abc('서울특별시')

function usedata(data){
    var elem = `<ul class="placeList">`
    $(data).find('item').each(function(){
        var placeName = $(this).find('placeName').text()
        var addr = $(this).find('addr').text()
        elem += `<li>`
        elem += `<p>투표기관명 : ${placeName}</p>`
        elem += `<p>투표소주소 : ${addr}</p>`
        elem += `</li>`
    })
    elem += `</ul>`
    $('#content').append(elem)
}

$('.tabTit li').on('click', function() {
    var city = $(this).text()
    // console.log(city)
    $('#content .placeList').remove()
    abc(city)
})
