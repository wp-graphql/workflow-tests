const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const chalk = require('chalk');

/**
 * Find files containing @since todo tags
 */
async function findSinceTodoFiles(pattern = 'src/**/*.php') {
    try {
        console.log(chalk.blue('\nScanning for @since placeholder tags...'));
        console.log(chalk.gray('Looking for files matching pattern:', pattern));

        const files = glob.sync(pattern, {
            ignore: [
                'node_modules/**',
                'vendor/**',
                'phpcs/**',
                '.github/**',
                '.wordpress-org/**',
                'bin/**',
                'build/**',
                'docker/**',
                'img/**',
                'phpstan/**',
                'docs/**'
            ],
            dot: false,
            cwd: process.cwd()
        });

        console.log(chalk.gray(`Found ${files.length} PHP files to scan`));
        return files || [];
    } catch (error) {
        console.error(chalk.red('Error finding files:', error.message));
        return [];
    }
}

/**
 * Get all @since placeholders from a file
 */
function getSincePlaceholders(content) {
    // Look for both @since placeholders and standalone @next-version
    const sinceRegex = /@since\s+(todo|next-version|tbd)/gi;
    const nextVersionRegex = /@next-version/gi;
    
    const sinceMatches = content.match(sinceRegex) || [];
    const nextVersionMatches = content.match(nextVersionRegex) || [];
    
    return sinceMatches.length + nextVersionMatches.length;
}

/**
 * Update @since placeholders in a file
 */
function updateSinceTags(filePath, version) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        const placeholderCount = getSincePlaceholders(content);

        if (placeholderCount === 0) {
            return { updated: false, count: 0 };
        }

        // First replace @since placeholders
        content = content.replace(
            /@since\s+(todo|tbd|next-version)/gi,
            `@since ${version}`
        );

        // Then replace all standalone @next-version occurrences
        content = content.replace(
            /@next-version/gi,
            version
        );

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            return { updated: true, count: placeholderCount };
        }

        return { updated: false, count: 0 };
    } catch (error) {
        throw new Error(`Error updating ${filePath}: ${error.message}`);
    }
}

/**
 * Update all @since todo tags in the project
 */
async function updateAllSinceTags(version, pattern = '**/*.php') {
    const results = {
        updated: [],
        errors: [],
        totalUpdated: 0
    };

    try {
        if (!version) {
            throw new Error('Version argument is required');
        }

        if (!version.match(/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/)) {
            throw new Error('Invalid version format. Expected format: x.y.z or x.y.z-beta.n');
        }

        const files = await findSinceTodoFiles(pattern);

        for (const file of files) {
            try {
                const { updated, count } = updateSinceTags(file, version);
                if (updated) {
                    results.updated.push({ file, count });
                    results.totalUpdated += count;
                }
            } catch (error) {
                results.errors.push({ file, error: error.message });
            }
        }

        return results;
    } catch (error) {
        throw new Error(`Error updating @since tags: ${error.message}`);
    }
}

/**
 * Generate a summary for release notes
 */
function generateReleaseNotesSummary(results) {
    if (results.totalUpdated === 0) {
        return '';
    }

    let summary = '### Since Tag Updates\n\n';
    summary += `Updated ${results.totalUpdated} \`@since\` placeholder`;
    summary += results.totalUpdated === 1 ? '' : 's';
    summary += ' in the following files:\n\n';

    results.updated.forEach(({ file, count }) => {
        summary += `- \`${file}\` (${count} update${count === 1 ? '' : 's'})\n`;
    });

    if (results.errors.length > 0) {
        summary += '\n#### Errors\n\n';
        results.errors.forEach(({ file, error }) => {
            summary += `- Failed to update \`${file}\`: ${error}\n`;
        });
    }

    return summary;
}

/**
 * CLI command to update @since tags
 */
async function main() {
    try {
        const version = process.argv[2];
        if (!version) {
            throw new Error('Version argument is required');
        }

        console.log(chalk.blue('\nUpdating @since placeholder tags...'));
        const results = await updateAllSinceTags(version);

        if (results.updated.length > 0) {
            console.log(chalk.green('\n✓ Updated files:'));
            results.updated.forEach(({ file, count }) => {
                console.log(chalk.gray(`  - ${path.relative(process.cwd(), file)} (${count} update${count === 1 ? '' : 's'})`));
            });
            console.log(chalk.green(`\nTotal placeholders updated: ${results.totalUpdated}`));
        } else {
            console.log(chalk.yellow('\nNo @since placeholder tags found'));
        }

        if (results.errors.length > 0) {
            console.log(chalk.red('\n❌ Errors:'));
            results.errors.forEach(({ file, error }) => {
                console.log(chalk.gray(`  - ${path.relative(process.cwd(), file)}: ${error}`));
            });
            process.exit(1);
        }

        // Generate release notes summary
        const summary = generateReleaseNotesSummary(results);
        if (summary) {
            // Save summary to a temporary file for the workflow to use
            const summaryPath = '/tmp/since-tags-summary.md';
            fs.writeFileSync(summaryPath, summary);
            console.log(chalk.blue('\nSummary saved to:', summaryPath));
        }

        process.exit(0);
    } catch (error) {
        console.error(chalk.red('\n❌ Error:'), error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

// Export functions for testing and reuse
module.exports = {
    findSinceTodoFiles,
    getSincePlaceholders,
    updateSinceTags,
    updateAllSinceTags,
    generateReleaseNotesSummary
};