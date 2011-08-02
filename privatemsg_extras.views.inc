<?php
// $Id;

/**
 * Implementation of hook_views_plugins().
 */
function privatemsg_extras_views_plugins() {
  $path = drupal_get_path('module', 'privatemsg_extras');
  $theme_path = $path . '/theme';
  return array(
    'module' => 'privatemsg_extras',
    'style' => array(
      'privatemsg_extras_unformatted' => array(
        'title' => t('Privatemsg extras'),
        'help' => t('Privatemsg all users in unformatted view.'),
        'path' => $path,
        'handler' => 'privatemsg_extras_plugin_style_unformatted',
        'parent' => 'default',
        'theme' => 'privatemsg_extras_unformatted',
        'uses row plugin' => TRUE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
      ),
    ),
  );
}

