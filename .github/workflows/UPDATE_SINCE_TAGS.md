# @since Tag Update Implementation Plan

## Overview

This document outlines the plan for implementing automated `@since` tag updates during the release process. The system will update placeholder version tags (such as `@since todo`, `@since next-version`, and `@since tbd`) with the actual version number during releases.

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

### 3. Testing ✅
- [x] Test script locally with various scenarios
- [x] Test with multiple @since tags in single file
- [x] Test with no @since tags present
- [ ] Test workflow with actual PR and release
- [ ] Test error scenarios in workflow context

### 4. Release Management Workflow Updates (Next Steps) 🚀
- [x] Add new step in release-management.yml after version bump
- [x] Integrate since-tag updates into the workflow
- [x] Add logging output to release notes
- [x] Handle potential errors gracefully
- [x] Ensure changes are committed with version bump

### 5. Changeset Integration
- [ ] Modify generate-changeset.yml to detect files with @since placeholders
- [ ] Add @since placeholder information to changeset content
- [ ] Update release PR template to include @since placeholder information
- [ ] Ensure this information flows through to final release notes

### 6. Documentation Updates
- [ ] Update SUMMARY.md with new functionality
- [ ] Update main README.md with @since tag information
- [ ] Update workflow documentation
- [ ] Add examples of using @since placeholders
- [ ] Document supported file types (PHP only for now)

## Script Enhancements Completed ✅

The `update-since-tags.js` script has been enhanced with:
- Improved console output using chalk for better readability
- Detailed logging of file updates and error conditions
- Release notes summary generation
- Version number validation
- Error handling for file operations
- Support for counting and reporting the number of updates per file
- Temporary file creation for workflow integration

## Local Testing Results ✅

The script has been successfully tested locally with:
- Multiple files containing @since placeholders
- Files with multiple placeholders
- Files with no placeholders
- Proper version number validation
- Summary generation for release notes
- Colored console output for better readability

## Supported Placeholders

The following placeholders will be automatically updated during release:
- `@since todo`
- `@since next-version`
- `@since tbd`

## File Types

Currently, the system only scans PHP files for @since placeholders. This may be expanded in future versions.

## Notes

- The script currently works as-is with CommonJS modules
- We're focusing on PHP files only for the initial implementation
- Changes are being made incrementally to avoid disrupting existing workflows
- Each change is tested thoroughly before moving to the next item

## Next Steps 🚀

1. Integrate the script into release-management.yml workflow
2. Test the integration with a real PR and release
3. Implement changeset integration for @since placeholder tracking
4. Update all documentation

## Future Considerations

- Support for additional file types (js, jsx, tsx, etc.)
- Support for additional placeholder formats
- Integration with other documentation tools
- Automated testing for the script
- Performance optimization for large codebases 