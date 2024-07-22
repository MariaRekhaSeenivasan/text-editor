// document.addEventListener('DOMContentLoaded', () => {
//     const fontFamilySelect = document.getElementById('font-family-selector');
//     const fontWeightSelect = document.getElementById('font-weight-selector');
//     const italicToggle = document.getElementById('italic-toggle');
//     const textEditor = document.getElementById('editor');
//     const saveButton = document.getElementById('save-button');
//     const resetButton = document.getElementById('reset-button');
    
//     // List of Google Fonts
//     const googleFonts = [
//         'Roboto',
//         'Open Sans',
//         'Lato',
//         'Montserrat',
//         'Arial', // Fallback
//         'Times New Roman' // Fallback
//     ];

//     const fontWeights = [
//         '400', // Normal
//         '700', // Bold
//         'italic' // Italic
//     ];

//     function populateFontFamilies() {
//         // Clear existing options
//         fontFamilySelect.innerHTML = '';

//         // Populate font family dropdown
//         googleFonts.forEach(font => {
//             const option = document.createElement('option');
//             option.value = font;
//             option.textContent = font;
//             fontFamilySelect.appendChild(option);
//         });
//         // Set default font weight options
//         populateFontWeights();
//     }

//     function populateFontWeights() {
//         // Clear existing options
//         fontWeightSelect.innerHTML = '';

//         // Populate font weight dropdown
//         fontWeights.forEach(weight => {
//             const option = document.createElement('option');
//             option.value = weight;
//             option.textContent = weight.charAt(0).toUpperCase() + weight.slice(1); // Capitalize
//             fontWeightSelect.appendChild(option);
//         });

//         // Set default styles
//         updateTextStyle();
//     }

//     function updateTextStyle() {
//         // Get selected font, weight, and italic style
//         const selectedFont = fontFamilySelect.value;
//         const selectedWeight = fontWeightSelect.value;
//         const isItalic = italicToggle.checked;

//         // Update text editor styles
//         textEditor.style.fontFamily = selectedFont;
//         textEditor.style.fontWeight = selectedWeight;
//         textEditor.style.fontStyle = isItalic ? 'italic' : 'normal';
//     }

//     function saveText() {
//         // Save text and styles to localStorage
//         localStorage.setItem('text', textEditor.innerHTML);
//         localStorage.setItem('fontFamily', fontFamilySelect.value);
//         localStorage.setItem('fontWeight', fontWeightSelect.value);
//         localStorage.setItem('isItalic', italicToggle.checked);
//     }

//     function resetText() {
//         // Reset the text and styles
//         textEditor.innerHTML = '';
//         fontFamilySelect.value = googleFonts[0]; // Reset to first font
//         fontWeightSelect.value = '400'; // Reset to normal
//         italicToggle.checked = false; // Reset italic toggle
//         updateTextStyle();
//         saveText(); // Save reset state
//     }

//     // Event listeners
//     fontFamilySelect.addEventListener('change', updateTextStyle);
//     fontWeightSelect.addEventListener('change', updateTextStyle);
//     italicToggle.addEventListener('change', updateTextStyle);
//     textEditor.addEventListener('input', saveText);
//     saveButton.addEventListener('click', saveText);
//     resetButton.addEventListener('click', resetText);

//     // Load saved text and styles
//     const savedText = localStorage.getItem('text');
//     const savedFontFamily = localStorage.getItem('fontFamily');
//     const savedFontWeight = localStorage.getItem('fontWeight');
//     const savedIsItalic = localStorage.getItem('isItalic');

//     if (savedText !== null) textEditor.innerHTML = savedText;
//     if (savedFontFamily !== null) {
//         fontFamilySelect.value = savedFontFamily;
//         populateFontWeights();  // Update weights based on saved font
//     }
//     if (savedFontWeight !== null) fontWeightSelect.value = savedFontWeight;
//     if (savedIsItalic !== null) italicToggle.checked = savedIsItalic === 'true';

//     updateTextStyle();
//     populateFontFamilies();
// });
document.addEventListener('DOMContentLoaded', () => {
    const fontFamilySelect = document.getElementById('font-family-selector');
    const fontWeightSelect = document.getElementById('font-weight-selector');
    const italicToggle = document.getElementById('italic-toggle');
    const textEditor = document.getElementById('editor');
    const saveButton = document.getElementById('save-button');
    const resetButton = document.getElementById('reset-button');
    
    let fontsData = {};

    // Fetch the JSON file
    fetch('font.json')
        .then(response => response.json())
        .then(data => {
            fontsData = data;
            populateFontFamilies();
        })
        .catch(error => {
            console.error('Error fetching the JSON:', error);
        });

    function populateFontFamilies() {
        // Clear existing options
        fontFamilySelect.innerHTML = '';

        // Populate font family dropdown
        Object.keys(fontsData).forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            fontFamilySelect.appendChild(option);
        });

        // Set default font weight options
        if (fontFamilySelect.options.length > 0) {
            fontFamilySelect.value = fontFamilySelect.options[0].value;
            populateFontWeights();
        }
    }

    function populateFontWeights() {
        // Clear existing options
        fontWeightSelect.innerHTML = '';

        // Get selected font family
        const selectedFont = fontFamilySelect.value;
        const weights = fontsData[selectedFont] || [];

        // Define available font weights
        const availableWeights = ['200', '300', '400', '500', '600', 'normal', 'bold'];

        // Populate font weight dropdown
        availableWeights.forEach(weight => {
            if (weights.includes(weight)) {
                const option = document.createElement('option');
                option.value = weight;
                option.textContent = weight.charAt(0).toUpperCase() + weight.slice(1); // Capitalize
                fontWeightSelect.appendChild(option);
            }
        });

        // Set default styles
        updateTextStyle();
    }

    function updateTextStyle() {
        // Get selected font, weight, and italic style
        const selectedFont = fontFamilySelect.value;
        const selectedWeight = fontWeightSelect.value || 'normal'; // Default to normal
        const isItalic = italicToggle.checked;

        // Update text editor styles
        textEditor.style.fontFamily = selectedFont;
        textEditor.style.fontWeight = selectedWeight === 'normal' ? 'normal' : selectedWeight;
        textEditor.style.fontStyle = isItalic ? 'italic' : 'normal';
    }

    function saveText() {
        // Save text and styles to localStorage
        localStorage.setItem('text', textEditor.innerHTML);
        localStorage.setItem('fontFamily', fontFamilySelect.value);
        localStorage.setItem('fontWeight', fontWeightSelect.value);
        localStorage.setItem('isItalic', italicToggle.checked);
    }

    function loadText() {
        // Load saved text and styles
        const savedText = localStorage.getItem('text');
        const savedFontFamily = localStorage.getItem('fontFamily');
        const savedFontWeight = localStorage.getItem('fontWeight');
        const savedIsItalic = localStorage.getItem('isItalic');

        if (savedText !== null) textEditor.innerHTML = savedText;
        if (savedFontFamily !== null) {
            fontFamilySelect.value = savedFontFamily;
            populateFontWeights();  // Update weights based on saved font
        }
        if (savedFontWeight !== null) fontWeightSelect.value = savedFontWeight;
        if (savedIsItalic !== null) italicToggle.checked = savedIsItalic === 'true';

        updateTextStyle();
    }

    // Event listeners
    fontFamilySelect.addEventListener('change', () => {
        populateFontWeights();
        updateTextStyle();
    });
    fontWeightSelect.addEventListener('change', updateTextStyle);
    italicToggle.addEventListener('change', updateTextStyle);
    textEditor.addEventListener('input', saveText);

    saveButton.addEventListener('click', saveText);
    resetButton.addEventListener('click', () => {
        localStorage.removeItem('text');
        localStorage.removeItem('fontFamily');
        localStorage.removeItem('fontWeight');
        localStorage.removeItem('isItalic');
        textEditor.innerHTML = '';
        fontFamilySelect.value = '';
        fontWeightSelect.innerHTML = '';
        italicToggle.checked = false;
    });

    // Initialize by loading saved text and styles
    loadText();
});

