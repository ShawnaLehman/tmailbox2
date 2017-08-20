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

            var has_been_read = communications[i].read_status == "TRUE";
            var is_urgent = communications[i].urgent_status === "TRUE";
            var is_pinned = communications[i].pinned === "TRUE";
            var one_block = "";
              if(is_urgent) {
                one_block += "<div class=\"row clickable hoverClass urgent\"  style=\"padding-bottom: 15px; padding-left: 10px; padding-top: 15px;\" id=\""+ communications[i].id + "\">";
              }
              else {
                one_block += "<div class=\"row clickable hoverClass not-urgent\"  style=\"padding-bottom: 15px; padding-left: 10px; padding-top: 15px;\" id=\""+ communications[i].id + "\">";
              }
              one_block += "<div class=\"col col-xs-2\" >";
              one_block += "<input type=\"checkbox\" style=\"margin-right: 5px;\">";
              if(is_urgent) {
                one_block += "<span class=\"change-icon\" title=\"Mark Not Urgent\"><i class=\"fa fa-star fa-lg\" aria-hidden=\"true\"></i></span></div>";
              }
              else {
                one_block += "<span class=\"change-icon\" title=\"Mark Urgent\"><i class=\"fa fa-star-o fa-lg\" aria-hidden=\"true\"></i></span></div>";
              }
              

              one_block += "<div class=\"col col-xs-8\" style=\"margin-left: -15px;\">";
              one_block += "<div class=\"row\">";
              one_block += "<div class=\"col col-xs-12\"><small>Porsche North York</small></div>";
              if (has_been_read) { 
                one_block += "<div class=\"col col-xs-12\" style=\"color: gray\">";
              } 
              else {
                one_block += "<div class=\"col col-xs-12\" style=\"color: black\">";; 
              }
              one_block += "<strong>" + communications[i].comm_subject + "</strong>" 
              one_block += "</div>";
              one_block += "<div class=\"col col-xs-12 mailbox-details comm-content\">" + communications[i].comm_content + "</div>";
              one_block += "</div>";
              one_block += "</div>";
              one_block += "<div class=\"col col-xs-2 text-right\">";
              one_block += "<small>Apr 19</small>";
              one_block += "<br><span class=\"unpin-icon\" title=\"Unpin Message\"><i style=\"color: #CC4B37;\" class=\"fa fa-thumb-tack fa-lg\" aria-hidden=\"true\"></i></span></div>";
              if (!has_been_read) { one_block += "<button class=\"btn btn-trend square btn-sm\">New</button>"; }
              one_block += "</div>";
              one_block += "</div>";

              content_count++
            //putting one block inside the holder
             content_to_add += one_block;
          }
        }

          //Updating DOM
        $('#allTipsDiv').html(content_to_add);
        $('#pin_count').html(content_count);
        $('#urgent_counter').html(urgent_count);
    }

  }).then(function () {

    // Update the read status and display the message
    $('.hoverClass').click(function(){
      $('.hoverClass').css("background", "white")
      $(this).css("background", "#93439a");
      // $(this).css("color", "white");
  
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
      
      console.log(selected_comm_id);
    })

    // Change the icon
    $('.change-icon').hover(function(event) {
      // var $star = $(event.target);
    });

    // Upin the current message and remove it from the dom
    $('.unpin-icon').click(function(event){
      event.stopPropagation();
      var $pin = $(event.target);
      var $message_div = $pin.parent().parent().parent();
      var selected_comm_id = $message_div.attr('id');
      var pinned_count = parseInt($('#pin_count').html());
      var unpin_url = "http://app2.loans.cars/api/dealer/update/message?message_id=" + selected_comm_id + "&col=pinned&val=FALSE";

      $.ajax({
        url: unpin_url,
        method: 'POST',
        success: function(result) {
          $message_div.remove();
          pinned_count -= 1;
          $('#pin_count').html(pinned_count);

          if ($('.card').attr('id') == selected_comm_id) {
            $('.card-title').html("");
            $('.card-text').html("");
          }
        }
      })
    })

    // Update the urgent status and change the icon
    $(".change-icon").click(function(event) {
      event.stopPropagation();
      var $star = $(event.target);
      
      var $message_div = $star.parent().parent().parent();
      var selected_comm_id = $message_div.attr('id');
      var is_urgent = $message_div.hasClass('urgent');
      var change_urgent_to = "";
      // var $span = $star.parent();
      // console.log($span);
      if (is_urgent) { change_urgent_to = "FALSE"} else { change_urgent_to = "TRUE"};
      var post_url = "http://app2.loans.cars/api/dealer/update/message?message_id=" + selected_comm_id + "&col=urgent_status&val=" + change_urgent_to;
      
      $.ajax({
        url: post_url,
        method: 'POST',
        success: function(result) {
          console.log('success');
        }
      });
      var urgent_count = $('#urgent_counter').html();

      urgent_count = parseInt(urgent_count);

      if (is_urgent) {
        $message_div.removeClass('urgent');
        // $message_div.attr('title') = 'Mark Urgent';
        $star.addClass('fa-star-o');
        $star.removeClass('fa-star');
        urgent_count -= 1;
      } 
      else {
        $message_div.addClass('urgent');
        // $message_div.attr('title') = 'Mark Not Urgent';
        $star.addClass('fa-star');
        $star.removeClass('fa-star-o');
        urgent_count += 1;
      }

      $('#urgent_counter').html(urgent_count);
    });
  })
})
