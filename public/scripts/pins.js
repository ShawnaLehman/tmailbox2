$(document).ready(function(){
  $.ajax({
    url : "http://app2.loans.cars/api/dealer/messages/66",
    success : function (result) {
      var communications = result.data.messages;
      console.log(communications);

        var  one_block = "<div class=\"row clickable hoverClass \"  style=\"padding-bottom: 15px; padding-left: 10px; padding-top: 15px;\">";
          one_block += "<div class=\"col col-xs-2\" >";
          one_block += "<input type=\"checkbox\" style=\"margin-right: 5px;\">";
          one_block += "<span class=\"change-icon\" title=\"Mark Urgent\"> <span class=\"change-icon\"> <em class=\"fa fa-star-o fa-lg\" aria-hidden=\"true\"></em> <em style=\"color:#CC4B37\" class=\"fa fa-star fa-lg\" aria-hidden=\"true\"></em> </span> </span></div>";
          one_block += "<div class=\"col col-xs-8\" style=\"margin-left: -15px;\">";
          one_block += "<div class=\"row\">";
          one_block += "<div class=\"col col-xs-12\"><small>Porsche North York</small></div>";
          one_block += "<div class=\"col col-xs-12\" style=\"color: gray\">";
          one_block += "<strong>What is the VIP programm </strong>";
          one_block += "</div>";
          one_block += "<div class=\"col col-xs-12 mailbox-details\">Information regarding Payout</div>";
          one_block += "</div>";
          one_block += "</div>";
          one_block += "<div class=\"col col-xs-2 text-right\">";
          one_block += "<small>Apr 19</small>";
          one_block += "<button class=\"btn btn-trend square btn-sm\" >New</button>";
          one_block += "</div>";
          one_block += "</div>";

          var content_to_add = "";

          //putting one block inside the holder

          for(var i = 1; i <= communications.length; i++) {
             content_to_add += one_block;
          }

            $('#allTipsDiv').html(content_to_add)
            // alert(content_to_add)

    }
  })
})
