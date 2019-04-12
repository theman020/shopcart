$(() => {
    function refreshList() {
        $.get('/vendors', (data) => {
            $('#vendorlist').empty()

            for (let todo of data) {
                let todoList = document.getElementById('vendorlist');
                let li = document.createElement('li');
                li.innerText = todo.name;
                //Add the delete Button
                                
                let Xbtn = document.createElement('button');
                Xbtn.setAttribute("id",`${todo.id}`)
                Xbtn.onclick = function () {
                    console.log("hello form delete")
                    console.log(this.id);
                    $.ajax({
                        url: '/deleteVendor',
                        type: 'DELETE',
                        data: {
                            id:this.id
                        },
                        success: function (result) {
                            if (result.success) {
                                refreshList()
                            } else {
                                console.log(result)
                                alert('Some error occurred in deleting object')
                            }
                        }
                    });
                }
                Xbtn.innerText = 'delete'
                li.appendChild(Xbtn); //append delete button to li item
                todoList.appendChild(li); //appendli to unordered list


            }
        })
    }

    refreshList();

    $('#add').click(() => {
        console.log('adding')
        $.post(
            '/vendors', {
                name: $('#vendorname').val()
            },
            (data) => {
                if (data.success) {
                    $('#vendorname').empty()
                    refreshList()
                } else {
                    alert('Some error occurred in adding object')
                }
            })
    })

})