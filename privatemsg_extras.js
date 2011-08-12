Drupal.behaviors.privatemsg_extras = function (context) {
  console.log('works');
  $("#privatemsg-exras form").hide();
	$("#privatemsg-exras a.uibutton").click(function(e) {
    e.preventDefault();
    $("#privatemsg-exras form").toggle("fast");
	});
}