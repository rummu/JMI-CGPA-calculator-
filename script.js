document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cgpa-form');
    const resultArea = document.getElementById('result-area');
    const resetButton = document.getElementById('reset-btn');
    const semesterInputs = [
        document.getElementById('sem1'), document.getElementById('sem2'),
        document.getElementById('sem3'), document.getElementById('sem4'),
        document.getElementById('sem5'), document.getElementById('sem6'),
        document.getElementById('sem7'), document.getElementById('sem8')
    ];

    // Weights per semester (index 0 for Sem 1, etc.)
    const weights = [0.25, 0.25, 0.50, 0.50, 0.75, 0.75, 1.00, 1.00];
    const MAX_GPA = 10.0;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        // Clear previous result and hide it smoothly
        resultArea.classList.remove('success', 'error', 'show');
        resultArea.textContent = '';

        let numerator = 0;
        let denominator = 0;
        let semestersEnteredCount = 0; // Track if any input was valid

        try {
            // Iterate through each semester input
            semesterInputs.forEach((inputElement, index) => {
                const valueStr = inputElement.value.trim(); // Get trimmed value

                // Process only if the input field is not empty
                if (valueStr !== "") {
                    const gpa = parseFloat(valueStr);

                    // Validate the parsed GPA
                    if (isNaN(gpa) || gpa < 0 || gpa > MAX_GPA) {
                        // Throw error specific to the invalid semester
                        throw new Error(`Invalid GPA entered for Semester ${index + 1}. Please use numbers between 0 and 10.`);
                    }

                    // If valid, add to numerator and denominator
                    const weight = weights[index];
                    numerator += weight * gpa;
                    denominator += weight * MAX_GPA; // Use MAX_GPA (10) for the denominator part
                    semestersEnteredCount++; // Increment count of valid entries
                }
            });

            // Check if at least one valid semester GPA was entered
            if (semestersEnteredCount === 0) {
                throw new Error("Please enter GPA for at least one semester.");
            }

            // Avoid division by zero (shouldn't happen if semestersEnteredCount > 0, but good practice)
            if (denominator === 0) {
                 throw new Error("Calculation error: Denominator is zero.");
            }

            // Calculate the final CGPA
            const finalCgpa = (numerator / denominator) * MAX_GPA;

            // Display the result with smooth fade-in
            resultArea.textContent = `Your Weighted CGPA is: ${finalCgpa.toFixed(2)} / ${MAX_GPA.toFixed(1)}`;
            resultArea.classList.add('success', 'show'); // Add 'show' class for transition

        } catch (error) {
            // Display error message with smooth fade-in
            resultArea.textContent = `Error: ${error.message}`;
            resultArea.classList.add('error', 'show'); // Add 'show' class for transition
        }
    });

    // Reset button functionality
    resetButton.addEventListener('click', () => {
        // form.reset(); // This clears the fields automatically
        resultArea.classList.remove('success', 'error', 'show');
        resultArea.textContent = ''; // Clear the result text
    });
});