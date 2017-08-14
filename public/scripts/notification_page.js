$(document).ready(function(){
  function getdata() {
    $.ajax({
      url: 'http://app2.loans.cars/api/dealer/messages/66',
      success: function(result) {
        var comm_counts = result.data.counts
        console.log(comm_counts);
      }
    })
  }
  setInterval(getdata, 2000)
})
