async function controlLight(state) {
    try {
        const response = await fetch('/control-light', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state }),
        });
        const result = await response.json();
        alert(result.message || result.error);
    } catch (error) {
        alert('Failed to control light. Please try again.');
    }
}
