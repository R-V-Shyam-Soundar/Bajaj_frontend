document.getElementById('submitBtn').addEventListener('click', async () => {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = ''; // Clear previous error

    // Validate JSON
    let jsonData;
    try {
        jsonData = JSON.parse(jsonInput);
    } catch (e) {
        errorDiv.textContent = 'Invalid JSON format.';
        return;
    }

    // Call the REST API
    try {
        const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        handleResponse(responseData);
    } catch (error) {
        errorDiv.textContent = 'Error calling API: ' + error.message;
    }
});

function handleResponse(data) {
    const optionsSelect = document.getElementById('options');
    optionsSelect.style.display = 'block';

    optionsSelect.onchange = () => {
        const selectedOptions = Array.from(optionsSelect.selectedOptions).map(option => option.value);
        const filteredData = filterData(data, selectedOptions);
        renderResponse(filteredData);
    };
}

function filterData(data, selectedOptions) {
    const result = {};

    if (selectedOptions.includes('alphabets')) {
        result.alphabets = data.alphabets || [];
    }
    if (selectedOptions.includes('numbers')) {
        result.numbers = data.numbers || [];
    }
    if (selectedOptions.includes('highestLowercase')) {
        result.highestLowercase = data.highestLowercase || '';
    }

    return result;
}

function renderResponse(data) {
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
