$(() => {
    $('#add').click(() => {
        
        $.post('/user', {
            name: $('#username').val()
        }, (userData) => {
            if (userData.success) {
                $('#username').empty()
                console.log('about to fetch all products for shop page')
                $.get('/products', (data) => {
                    console.log(data);
                    // let shoplist = document.getElementById('shopcardlist');
                    $('#shopcardlist').empty();
                    
                    for (let product of data) {
                        $('#shopcardlist').append(
                            `<div class="card card-1">
                    <label>${product.name}</label>
                    <br>
                    <label>${product.price}</label>

                        <div class='btns'>
                            <button id = ${product.id} onclick="addToCart(${userData.id},${product.id})" class="glyphicon glyphicon-plus"></button>
                        </div>
                    </div>
                    `
                    )
                    }
                })
            }
        })
    })

})

function addToCart( userID,prodID){
    //console.log(userID,prodID)
    $.post('/addItem',{
        uid:userID,
        pid:prodID
    },(data)=>{
        if(data.success){
            alert('Product added to cart suceesfully')
        }
        else{
            alert('Some error in Adding product')
        }
    })
}