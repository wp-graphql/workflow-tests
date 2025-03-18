<?php
/**
 * Plugin Name: Automation Tests
 * Description: A plugin to test automation workflows.
 * Version: 6.0.0
 * Author: Jason Bahl
 * Tested up to: 6.2
 */

/**
 * Added a missing docblock in 5.1.0
 */ 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// add missing comment in 5.1.0
require_once __DIR__ . '/constants.php';

// show a message in the admin dashboard with the plugin name and version
add_action( 'admin_notices', function() {
	echo '<div class="notice notice-info"><p>🌮 Automation Tests v' . AUTOMATION_TESTS_VERSION . '</p></div>';
});
