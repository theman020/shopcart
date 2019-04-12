$(()=>{
    $('#find').click(()=>{

        $.post('/getUserCart',{
            name: $('#username').val()
        },(cartData)=>{
            if(cartData.success){
                $('#username').empty()
                const data=cartData.data;
                $('#shopcardlist').empty();
                for (let item of data) {
                    $('#shopcardlist').append(
                        `<div class="card card-1">
                <label>Product Name : ${item.product.vendor.name}</label>
                <br>        
                <label>Product Name : ${item.product.name}</label>
                <br>
                <label>Product Price : ${item.product.price}</label>
                <br>
                <label>Product Quantity : ${item.quantity}</label>
                </div>
                `
                )
                }
            }
            else{
              alert('Unable to fetch cart data')  
            }
        })
    })
})