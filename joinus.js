document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const fullName = document.getElementsByName('fullName')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;

    // Create a string with the form data
    const logindata = `Full Name: ${fullName}\nEmail: ${email}\nPassword: ${password}\n`;

    // Create a blob and a link element to download the data
    const blob = new Blob([logindata], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.txt';
    a.textContent = 'Download your registration details';

    // Add the link to the output div
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous content
    outputDiv.appendChild(a);

    // Automatically trigger the download
    a.click();

    // Redirect to chat.html after a short delay
    setTimeout(() => {
        window.location.href = 'chat.html';
    }, 2000); // 2-second delay before redirect
});
