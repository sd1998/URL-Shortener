$(document).ready(function(){
  $("#submitButton").click(function(){
    var a = $("#urlInput").val();
    if(a.length <= 0){
      alert("Enter a valid link");
    }
    else{
      $.post('http://localhost:8080/api/shorten',{url: a},function(data){
          var result = '<a class="result" href="' + data.shortUrl + '">' + data.shortUrl + '</a>';
        
          $("#linkDiv").html(result);
          $("#linkDiv").hide().fadeIn('slow');
      });
    }
  });
});
