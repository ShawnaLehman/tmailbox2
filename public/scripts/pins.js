$(document).ready(function(){
  $.ajax({
    url : "http://app2.loans.cars/api/dealer/messages/70",
    success : function (result) {
      var communications = result.data.messages;
      console.log(communications);
      var content_to_add = "";
      var urgent_comms_count = 0;
      var content_count = 0;
      var urgent_count = 0;


      for(var i = 0; i < communications.length; i++) {

          if(communications[i].pinned === "TRUE")
          {

            if(communications[i].urgent_status === "TRUE") { urgent_count++ }

        var one_block = "<div class=\"row clickable hoverClass \"  style=\"padding-bottom: 15px; padding-left: 10px; padding-top: 15px;\" id=\""+ communications[i].id + "\">";
          one_block += "<div class=\"col col-xs-2\" >";
          one_block += "<input type=\"checkbox\" style=\"margin-right: 5px;\">";
          one_block += "<span class=\"change-icon\" title=\"Mark Urgent\"> <span class=\"change-icon\"> <em class=\"fa fa-star-o fa-lg\" aria-hidden=\"true\"></em> <em style=\"color:#CC4B37\" class=\"fa fa-star fa-lg\" aria-hidden=\"true\"></em> </span> </span></div>";
          one_block += "<div class=\"col col-xs-8\" style=\"margin-left: -15px;\">";
          one_block += "<div class=\"row\">";
          one_block += "<div class=\"col col-xs-12\"><small>Porsche North York</small></div>";
          one_block += "<div class=\"col col-xs-12\" style=\"color: gray\">";
          one_block += "<strong>" + communications[i].comm_subject + "</strong>";
          one_block += "</div>";
          one_block += "<div class=\"col col-xs-12 mailbox-details comm-content\">" + communications[i].comm_content + "</div>";
          one_block += "</div>";
          one_block += "</div>";
          one_block += "<div class=\"col col-xs-2 text-right\">";
          one_block += "<small>Apr 19</small>";
          one_block += "<button class=\"btn btn-trend square btn-sm\" >New</button>";
          one_block += "</div>";
          one_block += "</div>";

          content_count++
          //putting one block inside the holder
             content_to_add += one_block;
          }
        }

          //Updating DOM
            $('#allTipsDiv').html(content_to_add)
            $('#pin_count').html(content_count)
            $('#urgent_counter').html(urgent_count)

            //when a message is selected

            $('.hoverClass').click(function(){
              $('.hoverClass').css("background", "white")
              $(this).css("background", "#93439a");
              // $(this).css("color", "white");

              var selected_comm_id =  $(this).attr('id');

                // go get content for selected message by its id
                var get_id_url = "http://app2.loans.cars/api/dealer/message/" + selected_comm_id;

                $.ajax({
                  url: get_id_url,
                  success: function(result) {
                    console.log(result.data.message.comm_content);
                  }
                })

              console.log(selected_comm_id);
            })


    }

  })
})
