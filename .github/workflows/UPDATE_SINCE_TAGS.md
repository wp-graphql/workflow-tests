# @since Tag Update Implementation Plan

## Overview

This document outlines the plan for implementing automated `@since` tag updates during the release process. The system will update placeholder version tags (such as `@since todo`, `@since next-version`, and `@since tbd`) with the actual version number during releases.

## Implementation Checklist

### 1. Package.json Updates
- [ ] Add `chalk` to devDependencies
- [ ] Add a new npm script for running the update-since-tags.js (e.g., `since-tags:update`)

### 2. Script Enhancements (update-since-tags.js)
- [ ] Add better console output formatting using chalk
- [ ] Enhance logging to provide detailed information about updated files
- [ ] Add functionality to generate a summary of updates for release notes
- [ ] Add documentation for supported placeholders (`todo`, `next-version`, `tbd`)
- [ ] Add error handling for file operations
- [ ] Add validation for version number input

### 3. Release Management Workflow Updates
- [ ] Add new step in release-management.yml after version bump
- [ ] Integrate since-tag updates into the workflow
- [ ] Add logging output to release notes
- [ ] Handle potential errors gracefully
- [ ] Ensure changes are committed with version bump

### 4. Changeset Integration
- [ ] Modify generate-changeset.yml to detect files with @since placeholders
- [ ] Add @since placeholder information to changeset content
- [ ] Update release PR template to include @since placeholder information
- [ ] Ensure this information flows through to final release notes

### 5. Documentation Updates
- [ ] Update SUMMARY.md with new functionality
- [ ] Update main README.md with @since tag information
- [ ] Update workflow documentation
- [ ] Add examples of using @since placeholders
- [ ] Document supported file types (PHP only for now)

### 6. Testing
- [ ] Test script locally with various scenarios
- [ ] Test workflow with actual PR and release
- [ ] Test error scenarios
- [ ] Test with multiple @since tags in single file
- [ ] Test with no @since tags present

## Supported Placeholders

The following placeholders will be automatically updated during release:
- `@since todo`
- `@since next-version`
- `@since tbd`

## File Types

Currently, the system only scans PHP files for @since placeholders. This may be expanded in future versions.

## Notes

- The script currently works as-is, so we won't refactor the module system (ES modules vs CommonJS) at this time
- We'll focus on PHP files only for the initial implementation
- Changes should be made incrementally to avoid disrupting existing workflows
- Each change should be tested thoroughly before moving to the next item

## Future Considerations

- Support for additional file types (js, jsx, tsx, etc.)
- Support for additional placeholder formats
- Integration with other documentation tools
- Automated testing for the script
- Performance optimization for large codebases 