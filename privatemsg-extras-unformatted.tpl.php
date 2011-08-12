<?php
// $Id;
/**
 * @file privatemsg_extras-unformatted.tpl.php (based on views-view-unformatted.tpl.php)
 * Display unformatted list of users with toggle-able privatemsg new message form to message all users returned in view.
 *
 */
?>

<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>

<?php
	if(user_access('access privatemsg extras')){
		$recipients = array();
		
		for($i=0; $i<count($view->result); $i++){
			
			$recipients[] = $view->result[$i]->uid;
		}	
		if(is_array($recipients) && !empty($recipients)){	
			
			$privatemsg_form = drupal_get_form('privatemsg_new',implode(',',$recipients));
			
			//privatemsg_new does a drupal_set_title overriding the view title - so lets take back the title
			$title = $view->display['default']->display_options['title'];
			drupal_set_title($title); //not sure if I should use t($title) here;
			
      print '<div id="privatemsg-exras"><a href="#" class="uibutton">' . t('Send a message to @title', array('@title' => strtolower($title))) . '</a>' . $privatemsg_form . '</div>';
		}
	}
?>
<?php foreach ($rows as $id => $row): ?>
  <div class="<?php print $classes[$id]; ?>">
    <?php print $row; ?>
	<div style="clear:both;"></div>
  </div>
<?php endforeach; ?>
