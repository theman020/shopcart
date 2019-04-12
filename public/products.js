$(() => {
    function refreshList() {

        $.get('/products', (data) => {
            $('#showproductlist').empty()

            for (let todo of data) {
                let productList=document.getElementById('showproductlist');
                let li = document.createElement('li');
                li.innerText=todo.name;

                //price label
                var price = document.createElement("LABEL");
                price.innerText='Price :'+todo.price;

                //Add the delete Button
                let Xbtn = document.createElement('button');
                Xbtn.innerText = 'delete';
                Xbtn.setAttribute("id",`${todo.id}`)
                Xbtn.onclick = function () {
                    console.log("hello form delete in product")
                    console.log(this.id);
                    $.ajax({
                        url: '/deleteProduct',
                        type: 'DELETE',
                        data: {
                            id:this.id//we get button id 
                        },
                        success: function (result) {
                            if (result.success) {
                                refreshList()
                            } else {
                                console.log(result)
                                alert('Some error occurred in deleting Product')
                            }
                        }
                    });

                }


                li.appendChild(price);//append price label to li item.
                li.appendChild(Xbtn);//append delete button to li item
                productList.appendChild(li);
            }
        })
    }

    function selectList(){
        console.log('in select list')
        $.get('/vendors',(data)=>{
            let productList=document.getElementById('productlist');
            for(let vendor of data){
                let option=document.createElement('option');
                option.text=vendor.name;
                option.value=vendor.id;
                productList.append(option);
            }
        })
    }
    selectList();
    refreshList();

    $('#add').click(()=>{
        $.post(
            '/products',
            {
                name:$('#productname').val(),
                price:$('#price').val(),
                vendorId:$('#productlist').val()
            },
            (data)=>{
                if(data.success){
                    $('#productname').empty()
                    refreshList()
                }
                else{
                    alert('Some error occurred in adding object')
                }
            })
    })

    

})