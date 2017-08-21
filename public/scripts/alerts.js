
$(document).ready(function(){
    console.log("Hi")
    $.ajax({
      url : "http://app2.loans.cars/api/dealer/messages/70",
      success : function (result) {
        var communications = result.data.messages;
        console.log(communications);
        var content_to_add = "";
        
        var alert_count = 0;
        var content_count = 0;
        var pinned_count = 0;
        var read_count = 0;

        function formatDate(date) {
            var monthNames = [
                "Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul",
                "Aug", "Sept", "Oct",
                "Nov", "Dec"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            // var year = date.getFullYear();

            return monthNames[monthIndex] + ' ' + day;
        }
  
        for(var i = 0; i < communications.length; i++) {
            console.log(communications[i].comm_type)

            if(communications[i].comm_type=== "alert")
            {
              
              var date = new Date(communications[i].time);
              
              
              var is_pinned = communications[i].pinned === "TRUE";
              if(is_pinned) { pinned_count++ }
              var has_been_read = communications[i].read_status == "TRUE";
              if (has_been_read) { alert_count++ } 

              var read_string = "";
              if (has_been_read) {read_string = "message-read"};

                var one_block = "";

                one_block += "<div class=\"row clickable hoverClass " + read_string + "\"  style=\"padding-bottom: 15px; padding-left: 10px; padding-top: 15px;\" id=\""+ communications[i].id + "\">";
                one_block += "<div class=\"col col-xs-2\" >";
                one_block += "<input type=\"checkbox\" style=\"margin-right: 5px;\">";
                if(is_pinned) {
                    one_block += "<br><span class=\"pin-icon\" title=\"Unpin Message\"><i class=\"fa fa-thumb-tack fa-lg is-pinned\" aria-hidden=\"true\"></i></span></div>";
                }
                else {
                    one_block += "<br><span class=\"pin-icon\" title=\"Unpin Message\"><i class=\"fa fa-thumb-tack fa-lg\" aria-hidden=\"true\"></i></span></div>";
                }

                one_block += "<div class=\"col col-xs-8\" style=\"margin-left: -15px;\">";
                one_block += "<div class=\"row\">";
                one_block += "<div class=\"col col-xs-12\"><small>Porsche North York</small></div>";

                one_block += "<div class=\"col col-xs-12\">";
                one_block += "<strong>" + communications[i].comm_subject + "</strong>" 
                one_block += "</div>";
                one_block += "<div class=\"col col-xs-12 mailbox-details comm-content\">" + communications[i].comm_content + "</div>";
                one_block += "</div>";
                one_block += "</div>";
                one_block += "<div class=\"col col-xs-2 text-right\">";
                one_block += "<small>" + formatDate(date) + "</small>";
                if (!has_been_read) { one_block += "<button class=\"btn btn-trend square btn-sm\">New</button>"; }
                one_block += "</div>";
                one_block += "</div>";
  
                content_count++;
              //putting one block inside the holder
               content_to_add += one_block;
            }
          }
  
            //Updating DOM
          $('#allTipsDiv').html(content_to_add);
          $('#pin_count').html(pinned_count);

          $('#alert_count').html(alert_count);
      }
  
    }).then(function () {
  
      // Update the read status and display the message
      $('.hoverClass').click(function(){
        $('.hoverClass').css("background", "white")
        $(this).css("background", "#93439a");
        // $(this).css("color", "white");
        
        var $message_div = $(this);
        var selected_comm_id = $(this).attr('id');
    
        // go get content for selected message by its id
        var get_id_url = "http://app2.loans.cars/api/dealer/message/" + selected_comm_id;
  
        $.ajax({
          url: get_id_url,
          success: function(result) {
            $('.card').attr('id', parseInt(selected_comm_id));
            $('.block_msg_area').html(result.data.message.comm_content)
            $('.block_subject_area').html(result.data.message.comm_subject)
            console.log(result.data.message.comm_content);
          }
        })
  
        var $new_btn = $(this).find($(".btn.btn-trend.square.btn-sm"));
  
        if ($new_btn.length != 0) {
          var update_read_url = "http://app2.loans.cars/api/dealer/update/message?message_id=" + selected_comm_id + "&col=read_status&val=TRUE";
          
          $.ajax({
            url: update_read_url,
            method: 'POST',
            success: function(result) {
              $new_btn.remove();
            }
          })
        } 
        
        $('.selected-message').removeClass('selected-message');
        $message_div.addClass('selected-message');
        if (!$message_div.hasClass('message-read')) {
          $message_div.addClass('message-read');
        }

        console.log(selected_comm_id);
      })
  
      // Upin the current message and remove it from the dom
      $('.pin-icon').click(function(event){
        event.stopPropagation();
        var $pin = $(event.target);
        var $message_div = $pin.parent().parent().parent();
        var selected_comm_id = $message_div.attr('id');
        var pinned_count = parseInt($('#pin_count').html());

        var new_pinned_val = "";

        var is_pinned = $pin.hasClass('is-pinned');

        if (is_pinned) {
            new_pinned_val = "FALSE";
            $pin.removeClass('is-pinned');
            pinned_count--;
        }
        else {
            new_pinned_val = "TRUE";
            $pin.addClass('is-pinned');
            pinned_count++;
        }

        $('#pin_count').html(pinned_count);

        var unpin_url = "http://app2.loans.cars/api/dealer/update/message?message_id=" + selected_comm_id + "&col=pinned&val=" + new_pinned_val;
  
        $.ajax({
          url: unpin_url,
          method: 'POST',
          success: function(result) {
            console.log("Success");
          },
          error: function(result) {
            $('#pin_count').html(pinned_count--);
          }
        })
      })
    })
  })
  