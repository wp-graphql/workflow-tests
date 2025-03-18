# @since Tag and Deprecated Version Placeholder Update Implementation Plan

## Overview

This document outlines the plan for implementing automated version placeholder updates during the release process. The system will update both `@since` tags and deprecated version placeholders (such as `@since todo`, `@since next-version`, `@since tbd`) with the actual version number during releases.

## Implementation Checklist

### 1. Package.json Updates ✅
- [x] Add `chalk` to devDependencies
- [x] Add a new npm script for running the update-since-tags.js (e.g., `since-tags:update`)

### 2. Script Enhancements (update-since-tags.js) ✅
- [x] Add better console output formatting using chalk
- [x] Enhance logging to provide detailed information about updated files
- [x] Add functionality to generate a summary of updates for release notes
- [x] Add documentation for supported placeholders (`todo`, `next-version`, `tbd`)
- [x] Add error handling for file operations
- [x] Add validation for version number input
- [x] Add directory-specific scanning (root, /src, /tests)
- [x] Add comprehensive ignore patterns for common directories
- [x] Add dry-run mode for PR previews

### 3. Testing ✅
- [x] Test script locally with various scenarios
- [x] Test with multiple placeholders in single file
- [x] Test with no placeholders present
- [x] Test workflow with actual PR and release
- [x] Test error scenarios in workflow context

### 4. Release Management Workflow Updates ✅
- [x] Add new step in release-management.yml after version bump
- [x] Integrate placeholder updates into the workflow
- [x] Add logging output to release notes
- [x] Handle potential errors gracefully
- [x] Ensure changes are committed with version bump

### 5. Changeset Integration ✅
- [x] Modify generate-changeset.yml to detect files with version placeholders
- [x] Add placeholder information to changeset content
- [x] Update release PR template to include placeholder information
- [x] Ensure this information flows through to final release notes

### 6. Documentation Updates 🚀
- [ ] Update SUMMARY.md with new functionality
- [ ] Update main README.md with placeholder information
- [ ] Update workflow documentation
- [ ] Add examples of using version placeholders
- [ ] Document supported file types and scanning patterns
- [ ] Document directory-specific scanning
- [ ] Document ignore patterns configuration
- [ ] Document dry-run mode usage

## Enhanced Features ✅

### Directory-Specific Scanning
The script now intelligently scans specific directories:
- Root directory (*.php)
- src directory (src/**/*.php)
- tests directory (tests/**/*.php)

### Comprehensive Ignore Patterns
Automatically ignores common directories:
- vendor/
- node_modules/
- wp-content/
- .wordpress-org/
- .git/
- .github/
- bin/
- build/
- dist/
- assets/
- docs/
- languages/
- logs/
- temp/
- tmp/
- cache/

### Dry-Run Mode
- Preview which files will be updated during release
- Shows count of placeholders per file
- Generates summary for release PR
- No files are modified in this mode

## Script Enhancements Completed ✅

The `update-since-tags.js` script has been enhanced with:
- Improved console output using chalk for better readability
- Detailed logging of file updates and error conditions
- Release notes summary generation
- Version number validation
- Error handling for file operations
- Support for counting and reporting the number of updates per file
- Temporary file creation for workflow integration
- Directory-specific scanning
- Comprehensive ignore patterns
- Dry-run mode for previews

## Workflow Integration ✅

The script is now fully integrated with:
- release-management.yml for actual updates
- generate-changeset.yml for PR previews
- Proper error handling and reporting
- Clear summary generation for PR descriptions

## Supported Placeholders

The following placeholders will be automatically updated during release:
- `@since todo`
- `@since next-version`
- `@since tbd`
- Deprecated version placeholders following the same pattern

## File Types

Currently, the system scans PHP files in specific directories for version placeholders. This may be expanded in future versions.

## Documentation Plan 🚀

1. SUMMARY.md Updates
   - Overview of version placeholder system
   - Explanation of supported placeholders
   - Directory scanning patterns
   - Ignore patterns
   - Dry-run mode usage

2. README.md Updates
   - Quick start guide for using placeholders
   - Examples of supported formats
   - Link to detailed documentation

3. Workflow Documentation
   - Integration with release process
   - PR preview functionality
   - Error handling and troubleshooting
   - Configuration options

4. Examples and Tutorials
   - Common usage patterns
   - Best practices
   - Troubleshooting guide

## Future Considerations

- Support for additional file types (js, jsx, tsx, etc.)
- Support for additional placeholder formats
- Integration with other documentation tools
- Automated testing for the script
- Performance optimization for large codebases
- Customizable ignore patterns
- Customizable directory scanning patterns 