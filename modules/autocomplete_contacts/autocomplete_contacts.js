/**
 * @file
 * JS file of autocomplete_contacts. Does everything needed
 * 
 * @author Willem Coetzee
 */

/**
 * Using Drupal behaviours to declare main function
 */
Drupal.behaviors.autocomplete_contacts = function() {

  //for now just hide
  $('#edit-recipient').hide();

  var navigationIndex = 0;

  $('#edit-recipient-wrapper').append("<div id='usernames-wrapper'><div id='entered-usernames-wrapper'></div><div style='clear:both'></div><input id='usernames-input' type='text' autocomplete='off'/></div><div style='clear: both'></div><div id='dropdown-usernames'></div>");

    $("#usernames-input").keyup(function(e, keyCode){
    // gets the pressed key
    keyCode = keyCode || e.keyCode;
    if (keyCode == 13) { //enter/return key
      var usernameValue = $(".usernames-dropdown-item:nth-child("+ navigationIndex +") .username-value").html();
      $("#entered-usernames-wrapper").append("<div class='entered-username'>" + $(".usernames-dropdown-item:nth-child("+ navigationIndex +")").html() + "<a class='close-entered-username'>×</a></div>");
      // Add the username to the original hidden input
      if ($('#edit-recipient').val() == "")
        $('#edit-recipient').val($(".usernames-dropdown-item:nth-child("+ navigationIndex +") .username-value").html());
      else
        $('#edit-recipient').val($('#edit-recipient').val() + ',' + $(".usernames-dropdown-item:nth-child("+ navigationIndex +") .username-value").html());
      // Clear what needs to be cleared.
      $("#usernames-input").val('');
      $("#dropdown-usernames").html('');
      $("#dropdown-usernames").hide();
      navigationIndex = 0;
      //Remove the name from the original array so it cannot be used twice
      //var deleteIndex = 0;
      //for (var i = 0; i < Drupal.settings.autocomplete_contacts.user_usernames.length; i++) {
      //  if (Drupal.settings.autocomplete_contacts.user_usernames[i] == usernameValue)
      //    deleteIndex = i;
      //  }
        //Drupal.settings.autocomplete_contacts.user_usernames.splice(deleteIndex,1);
        //Drupal.settings.autocomplete_contacts.user_realnames.splice(deleteIndex,1);
    }
    // Down arrow pressed
    else if (keyCode == 40) {
      $(".usernames-dropdown-item:nth-child("+ navigationIndex +")").css("background-color", "white");
      navigationIndex = navigationIndex+1;     
      $(".usernames-dropdown-item:nth-child("+ navigationIndex +")").css("background-color", "#ebeef0");
    }
    // Up arrow pressed
    else if (keyCode == 38) {
      $(".usernames-dropdown-item:nth-child("+ navigationIndex +")").css("background-color", "white");
      navigationIndex = navigationIndex-1;     
      $(".usernames-dropdown-item:nth-child("+ navigationIndex +")").css("background-color", "#ebeef0");
    }
    else {
      $('#dropdown-usernames').html('');
      $('#dropdown-usernames').css('display', 'block');
      var dropdownLength = Drupal.settings.autocomplete_contacts.user_usernames.length;
      var temp_array = $("#edit-recipient").val().split(',');
      for (var k = 0; k < dropdownLength; k++) {
        if(($("#usernames-input").val() != '') && (Drupal.settings.autocomplete_contacts.user_usernames[k].toUpperCase().indexOf($("#usernames-input").val().toUpperCase(), 0) > -1) && (jQuery.inArray(Drupal.settings.autocomplete_contacts.user_usernames[k], temp_array) == -1)) {
          $('#dropdown-usernames').append("<div class='usernames-dropdown-item'><div class='username-value'>" + Drupal.settings.autocomplete_contacts.user_usernames[k] + "</div>" + Drupal.settings.autocomplete_contacts.user_realnames[k] + "</div>");
        }
        else {
          navigationIndex = 0;
        }
      }
    }
    // Backspace pressed
    if (keyCode == 8) {
      if ($("#usernames-input").val() == "") {
        $(".entered-username:last-child").remove();
        // Now also remove from actual original hidden input
        var temp_array = $("#edit-recipient").val().split(',');
        temptemp = temp_array.pop()
        if (temp_array.length == 1) {
          temp_string = temp_array[0];
        }
        else if (temp_array.length > 1) {
          temp_string = '';
          for (var k = 0; k < temp_array.length; k++) {
            if (k == 0)
              temp_string = temp_array[k];
            else
              temp_string = temp_string + ',' + temp_array[k];
          }
        }
        else {
          temp_string = '';
        }
        $("#edit-recipient").val(temp_string);
      }
      $("#dropdown-usernames").hide();
    }
    
    //Mouse actions

    //Mouseclick on dropdown items
    $(".usernames-dropdown-item").click(function() {
      $("#entered-usernames-wrapper").append("<div class='entered-username'>" + $(this).html() + "<a class='close-entered-username'>×</a></div>");
      // Add the username to the original hidden input
      if ($('#edit-recipient').val() == "")
        $('#edit-recipient').val($(this).children('.username-value').html());
      else
        $('#edit-recipient').val($('#edit-recipient').val() + ',' + $(this).children('.username-value').html());
      // Clear what needs to be cleared.
      $("#usernames-input").val('');
      $("#dropdown-usernames").html('');
      $("#dropdown-usernames").hide();
      navigationIndex = 0;
      $("#usernames-input").focus();

      $(".entered-username a").click(function() {
        var temp_array = $("#edit-recipient").val().split(',');
        var deleteIndex = 0;
        for (var i = 0; i < temp_array.length; i++) {
          if (temp_array[i] == $(this).parent().children('.username-value').html())
            deleteIndex = i;
        }
        temp_array.splice(deleteIndex,1);

        $(this).parent().remove();
        //Now we use this code to make a string again since join doesnt want to work
        if (temp_array.length == 1) {
          temp_string = temp_array[0];
        }
        else if (temp_array.length > 1) {
          temp_string = '';
          for (var k = 0; k < temp_array.length; k++) {
          if (k == 0)
            temp_string = temp_array[k];
          else
            temp_string = temp_string + ',' + temp_array[k];
          }
        }
        else {
          temp_string = '';
        }

        $("#edit-recipient").val(temp_string);
    
      });      
      
    });

    //Mouseover on dropdown items
    $(".usernames-dropdown-item").hover(function() {
      $(this).css("background-color", "#ebeef0");
    },
    function() {
      $(this).css("background-color", "white");
    });

  $(".entered-username a").click(function() {
    //$("#edit-recipient").val($(this).parent().children('.username-value').html());
    var temp_array = $("#edit-recipient").val().split(',');
    var deleteIndex = 0;
    for (var i = 0; i < temp_array.length; i++) {
      if (temp_array[i] == $(this).parent().children('.username-value').html())
        deleteIndex = i;
    }
    temp_array.splice(deleteIndex,1);

    $(this).parent().remove();
    //Now we use this code to make a string again since join doesnt want to work
    if (temp_array.length == 1) {
      temp_string = temp_array[0];
    }
    else if (temp_array.length > 1) {
      temp_string = '';
      for (var k = 0; k < temp_array.length; k++) {
        if (k == 0)
          temp_string = temp_array[k];
        else
          temp_string = temp_string + ',' + temp_array[k];
      }
    }
    else {
      temp_string = '';
    }

    $("#edit-recipient").val(temp_string);
    
  });

  }).keydown(function(e) {
    // prevents tab and enter to perform their default action
    if (e.which == 9 || e.which == 13) {
    e.preventDefault();
    }
  });
};



