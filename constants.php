<?php

define('AUTOMATION_TESTS_VERSION', '5.1.0');
define('AUTOMATION_TESTS_PLUGIN_NAME', 'automation-tests');

/**
 * Another test that should replace the since and deprecation version placeholders upon release. 
 
 * @since 5.1.0
 */
function another_since_replacement_test() {
  _deprecated_function( 'another_since_replacement_test', '5.1.0', '' );
}
