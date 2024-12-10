// Fetch and display members on members.html
$(document).ready(function () {
    if (window.location.pathname.endsWith("members.html")) {
        $.ajax({
            url: "json.json",
            method: "GET",
            dataType: "json",
            success: function (data) {
                const membersContainer = $('#members-container');
                data.members.forEach(member => {
                    const memberCard = `
                        <div class="member-card">
                            <img src="${member.image}" alt="${member.name}">
                            <h3>${member.name}</h3>
                            <p>${member.role}</p>
                        </div>`;
                    membersContainer.append(memberCard);
                });
            },
            error: function () {
                alert("Unable to load member data. Please try again later.");
            }
        });
    }
});

// Save form data to cookies
function saveFormData(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('number').value;
    const classOption = document.getElementById('class-option').value;

    document.cookie = "name=" + encodeURIComponent(name);
    document.cookie = "email=" + encodeURIComponent(email);
    document.cookie = "phone=" + encodeURIComponent(phone);
    document.cookie = "classOption=" + encodeURIComponent(classOption);

    alert('Your information has been saved!');
}

// Pre-fill form with saved data from cookies
function prefillForm() {
    const cookies = document.cookie.split(';');
    const cookieData = {};
    
    cookies.forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        cookieData[key] = decodeURIComponent(value);
    });

    if (cookieData.name) document.getElementById('name').value = cookieData.name;
    if (cookieData.email) document.getElementById('email').value = cookieData.email;
    if (cookieData.phone) document.getElementById('number').value = cookieData.phone;
    if (cookieData.classOption) document.getElementById('class-option').value = cookieData.classOption;
}

// Attach event listeners when the page loads
document.addEventListener('DOMContentLoaded', function () {
    prefillForm(); 
    const form = document.querySelector('.signup-form');
    if (form) form.addEventListener('submit', saveFormData);
});

//idk why cookies don't work don't yell at me<33