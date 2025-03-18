<?php

define('AUTOMATION_TESTS_VERSION', '5.0.0');
define('AUTOMATION_TESTS_PLUGIN_NAME', 'automation-tests');

/**
 * Another test that should replace the since and deprecation version placeholders upon release. 
 
 * @since next-version
 */
function another_since_replacement_test() {
  _deprecated_function( 'another_since_replacement_test', '@next-version', '' );
}
