var table_color_swich = 1;
        var page = 1;
        var all_page;
        var source_data;
        source_data = "";
        var final_hash;
        var user_name;
        var local_hash;
        var url = window.location.search;
        var hash = url.substr(1);
        if (hash != "") {
            if (hash.substr(0, 10) < 0) {
                localStorage.user = hash;
                local_hash = localStorage.user;
                final_hash = local_hash.substr(0, 20);
                user_name = local_hash.substr(20);
                document.getElementById("account").innerHTML = user_name;
            } else {
                localStorage.user = hash;
                local_hash = localStorage.user;
                final_hash = local_hash.substr(0, 19);
                user_name = local_hash.substr(19);
                document.getElementById("account").innerHTML = user_name;
            }
        } else {
            local_hash = localStorage.user;
            if (local_hash.substr(0, 10) < 0) {
                final_hash = local_hash.substr(0, 20);
                user_name = local_hash.substr(20);
                document.getElementById("account").innerHTML = user_name;
            } else {
                final_hash = local_hash.substr(0, 19);
                user_name = local_hash.substr(19);
                document.getElementById("account").innerHTML = user_name;
            }
        }
        $(function () {/*API操作和顯示區*/<!--- 初始 -->
            var source_text;
            source_text = "";
            $.ajax({
                type: 'get',
                url: "https://djangotest1156.herokuapp.com/api/RSS/get_source/",
                success: function (result) {
                    append_dropdown(result);
                }
            });
            $.ajax({
                type: 'post',
                url: "https://djangotest1156.herokuapp.com/api/RSS/get_info_for_page/" + "?page=1&source=" + source_text,
                data: {
                    "login_hash": final_hash,
                    "account": user_name,
                },
                success: function (result) {
                    console.log(result);
                    $.each(result[0], function (index, element) {
                        append_table(element);
                    });
                },
                error: function () {
                    alert("錯誤")
                }
            });
        });

        function change_source() {/*API操作和顯示區*/<!--- 初始 -->
            var source_text;
            source_text = source_data;
            clear_table();
            $.ajax({
                type: 'post',
                url: "https://djangotest1156.herokuapp.com/api/RSS/get_info_for_page/" + "?page=1&source=" + source_text,
                data: {
                    "login_hash": final_hash,
                    "account": user_name,
                },
                success: function (result) {
                    console.log(result);
                    $.each(result[0], function (index, element) {
                        append_table(element);
                    });
                },
                error: function () {
                    alert("錯誤")
                }
            });
        }

        function change_source_data() {
            source_data = $("#source_filter").val();
            change_source();
        }

        function append_table(data) {
            $('.tab').append(
                $('<tr>').append(
                    $('<td class="title">').append(
                        $('<p>',
                            {text: data[1]})
                    ),


                    $('<td class="source">').append(
                        $('<p>',
                            {text: data[2]})
                    ),

                    $('<td class="category">').append(
                        $('<p>',
                            {text: data[3]})
                    ),

                    $('<td class="tag">').append(
                        $('<p>',
                            {text: data[4]})
                    ),

                    $('<td class="display">').append(
                        $('<p>',
                            {text: data[5]})
                    ),

                    $('<td colspan="2" class="edit">').append(
                        $('<input type="button" onclick="Edit_Id(this)" value="編輯" style="margin:5%;width:40%;height:100%; float: left">'),
                        $('<p>', {text: data[0]}),
                        $('<input type="button" onclick="Delete_Id(this)" value="刪除" style="margin:5%;width:40%;height:100%; float: right">'),
                        $('<p>', {text: data[0]})
                    )
                )
            );
            $("td.edit").children("p").css("display", "none");
        }

        function call_data(num) {
            var source_call;
            source_call = source_data;
            $.ajax({
                type: 'post',
                url: ' https://djangotest1156.herokuapp.com/api/RSS/get_info_for_page/' + "?page=" + num + "&source=" + source_call,
                data: {
                    "login_hash": final_hash,
                    "account": user_name,
                },
                success: function (result) {
                    console.log(result);
                    $.each(result[0], function (index, element) {
                        all_page = Math.floor(result[1] / 20);
                        append_table(element);
                    });
                },
                error: function () {
                    alert("錯誤")
                }

            });

        }

        function next_clear_table() {
            if (page != all_page + 1) {
                var ntpage;
                ntpage = page + 1;
                page = ntpage;
                $("#tab tr:not(:first)").html("");
                call_data(ntpage);
            }
        }

        function before_clear_table() {
            if (page != 1) {
                var bfpage;
                bfpage = page - 1;
                page = bfpage;
                $("#tab tr:not(:first)").html("");
                call_data(bfpage);
            }
        }

        function enter_search_text() {
            if (event.keyCode == 13) {
                search_text();
            }
        }


        function search_text() {

            let se_ta = document.getElementById("search_target");
            console.log(se_ta);
            var text = se_ta.value;
            console.log(text);
            search(text);
        }

        function clear_table() {
            $("#tab tr:not(:first)").html("");
        }

        function search(target) {
            $.ajax({
                type: 'post',
                url: 'https://djangotest1156.herokuapp.com/api/RSS/search_data/' + "?title=" + target,
                data: {
                    "login_hash": final_hash,
                    "account": user_name,
                },
                success: function (result) {
                    clear_table();
                    $.each(result, function (index, element) {
                        append_table(element);
                    });
                    $("button").css("display", "none");
                },
                error: function () {
                    alert("錯誤")
                }
            });
        }

        function append_dropdown(data) {
            for (var i = 0; i < data.length; i++) {
                $('#source_filter').append(
                    $('<option ></option>',
                        {text: data[i]})
                )
            }
        }

        function Edit_Id(e) {
            let EdId = e.nextSibling;
            var EID = EdId.innerHTML;
            console.log(EID);
            window.location.href = "modify.html" + "?" + "id=" + EID;
        }
 
        function Delete_Id(e) {
            let DeId = e.nextSibling;
            var DID = DeId.innerHTML;
            Delete_Data(DID);
        }

        function Delete_Data(DID) {
            console.log(DID);
            console.log('asd');
            $(function () {
                console.log(DID);
                $.ajax({
                    type: 'delete',
                    url: 'https://djangotest1156.herokuapp.com/api/RSS/delete/',
                    dataType: 'json',
                    data: {
                        'id': DID
                    },
                    success: function (result) {
                        console.log(result);
                        alert(result);
                        window.location.reload()
                    },
                    error: function (xhr) {
                        alert(xhr)
                    }

                });

            })
        }