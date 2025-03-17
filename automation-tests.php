<?php
/**
 * Plugin Name: Automation Tests
 * Description: A plugin to test automation workflows.
 * Version: 4.1.0
 * Author: Jason Bahl
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/constants.php';

// show a message in the admin dashboard with the plugin name and version
add_action( 'admin_notices', function() {
	echo '<div class="notice notice-info"><p>🌮 Automation Tests v' . AUTOMATION_TESTS_VERSION . '</p></div>';
});

// New Feature 1

/**
 * Testing a new feature with a since tag
 * 
 * @since next-version
 * @deprecated @since next-version This function was deprecated when it was added because it was just a test.
 */
function test_since_next_version() {
  _deprecated_function( 'test_since_next_version', '@since next-version', '' )
}

