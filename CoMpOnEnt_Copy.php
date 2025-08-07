<?php
// Create this file as file-content-extractor.php in your project

// Configuration - Define multiple source directories with their file patterns
$sourcesConfig = [
//    [
//        'path' => 'C:\xampp\htdocs\RevuNova.about\app\Services\SallaApi',
//        'patterns' => ['*.php']
//    ],
//    [
//        'path' => 'C:\xampp\htdocs\RevuNova.about\app\Services\cachingServices',
//        'patterns' => ['*.php']
//    ],
];

// Output file path
$outputFile = 'Components_content.txt';

// Individual files to include (in addition to the directories)
$additionalFiles = [
    'C:\xampp\htdocs\RevuNova.about\index.html',
    'C:\xampp\htdocs\RevuNova.about\pricing-section.html',
    'C:\xampp\htdocs\RevuNova.about\hero-section.html',
    'C:\xampp\htdocs\RevuNova.about\navigation.html',
    'C:\xampp\htdocs\RevuNova.about\reviews-demo-section.html',
    'C:\xampp\htdocs\RevuNova.about\footer-section.html',
];

// Initialize array to store all file paths
$allFiles = [];

// Process each source directory configuration
foreach ($sourcesConfig as $config) {
    $directory = $config['path'];
    $patterns = $config['patterns'];

    // Skip if directory doesn't exist
    if (!is_dir($directory)) {
        echo "Warning: Directory does not exist: {$directory}\n";
        continue;
    }

    // Process each file pattern for this directory
    foreach ($patterns as $pattern) {
        // Get all files matching the pattern in the directory
        $matchedFiles = glob($directory . '/' . $pattern);

        // Add matched files to the combined array
        if (!empty($matchedFiles)) {
            $allFiles = array_merge($allFiles, $matchedFiles);
        }
    }
}

// Add the individual files to the combined array
$allFiles = array_merge($allFiles, $additionalFiles);

// Remove duplicate file paths (in case a file matches multiple patterns)
$allFiles = array_unique($allFiles);

// Extract controller files to analyze for view references
$controllerFiles = array_filter($allFiles, function($file) {
    // Look for files in the Controllers directory with .php extension
    return strpos($file, 'Controllers') !== false && pathinfo($file, PATHINFO_EXTENSION) === 'php';
});

// Find view references in controller files and add them to $allFiles
$viewFilesToAdd = [];

foreach ($controllerFiles as $controllerFile) {
    $content = file_get_contents($controllerFile);

    // Find all view() calls using regex
    // This matches patterns like: view('admin.dashboard') or view("products.index")
    // Also handles potential spaces between view and (
    if (preg_match_all("/view\s*\(['\"]([^'\"]+)['\"]/", $content, $matches)) {
        foreach ($matches[1] as $viewName) {
            // Convert dot notation (e.g., 'admin.dashboard') to directory path ('admin/dashboard')
            $pathParts = explode('.', $viewName);
            $viewFile = implode('/', $pathParts) . '.blade.php';

            // Build the full path to the view file
            $fullViewPath = "C:/xampp/htdocs/RevuNova.about/resources/views/" . $viewFile;

            // Only add the file if it exists
            if (file_exists($fullViewPath)) {
                $viewFilesToAdd[] = $fullViewPath;
            }
        }
    }
}

// Add the discovered view files to our list (avoiding duplicates)
$allFiles = array_unique(array_merge($allFiles, $viewFilesToAdd));

// Display a message about auto-discovered view files
if (count($viewFilesToAdd) > 0) {
    echo "Auto-discovered " . count($viewFilesToAdd) . " view files referenced in controllers.\n";
}

// Initialize content string
$finalContent = '';

// Count for successful files
$successCount = 0;

// Process each file
foreach ($allFiles as $index => $targetFile) {
    // Skip if file doesn't exist
    if (!file_exists($targetFile)) {
        echo "Warning: File does not exist: {$targetFile}\n";
        continue;
    }

    // Read the content of the target file
    $content = file_get_contents($targetFile);
    if ($content === false) {
        echo "Error: Unable to read the file {$targetFile}\n";
        continue;
    }

    // Add file path header
    $fileContent = "File Path: {$targetFile}\n\n" . $content;

    // Add to final content with separator (except for the first file)
    if ($index > 0) {
        $finalContent .= "\n\n\n\n\n\n"; // 6 new lines as separator
    }
    $finalContent .= $fileContent;
    $successCount++;
}

// Write the combined content to the output file
if (!empty($finalContent)) {
    $result = file_put_contents($outputFile, $finalContent);
    if ($result === false) {
        echo "Error: Unable to write to the file {$outputFile}\n";
    } else {
        echo "Successfully copied the content of {$successCount} files to {$outputFile}\n";
        echo "Output saved to: " . realpath($outputFile) . "\n";
    }
} else {
    echo "Error: No content was retrieved from the files\n";
}
