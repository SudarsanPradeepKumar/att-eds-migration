/**
 * Feature List Block
 * Displays a grid of features with optional icons/images
 */
export default function decorate(block) {
  // Get all rows (each row is a feature)
  const rows = [...block.children];

  rows.forEach((row) => {
    // Add semantic class to each feature item
    row.classList.add('feature-item');

    // Process children - typically image/icon and content
    const cells = [...row.children];

    cells.forEach((cell, index) => {
      // First cell with picture is the icon
      if (cell.querySelector('picture') || cell.querySelector('.icon')) {
        cell.classList.add('feature-icon');
      } else {
        // Content cell
        cell.classList.add('feature-content');
      }
    });
  });
}
