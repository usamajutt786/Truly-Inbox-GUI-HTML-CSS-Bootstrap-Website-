        // Function to initialize local storage with example emails
        function initializeLocalStorage() {
            const names = ["usama", "Razaq", "Hamid", "jazeel","Sheera"]
            localStorage.setItem('names', JSON.stringify(names));
            const emails = ["usamanasir786999@gmail.com ","khawarhussainsahu@gmail.com ", "arslan.hameed@gmail.com ", "waqasaslma123@gamil.com ","sherrahussaain@gmail.com "];
            localStorage.setItem('emails', JSON.stringify(emails));
        }

        // Function to populate the table with emails from local storage
        function populateTable() {
            const tableBody = document.querySelector('.table_data');
            const emails = JSON.parse(localStorage.getItem('emails'));
            const names = JSON.parse(localStorage.getItem('names'))

            if (emails && names) {
                emails.forEach((email, index) => {
                    const row = `
                    <tr>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck${index}">
                            </div>
                        </td>
                        <td>
                            ${names[index]}<button class="small-disabled-button" disabled>SMTP</button><a href="#"
                                    class="btn1 btn-default hide-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit
                                    Email Setting</a>
                                <br>${email}<i class="bi bi-exclamation-circle question-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Running: Warmup is active
                                Paused: Warmup is Paused
                                Stopped: Warmup is Stopped due to SMTP/IMAP authentication issues, Email Account getting Disconnected. Kindly activate the warmup again.
                                Suspended: We suspended your Email Warm-up for your email account because we couldn't verify its validity. The suspension is due to a high chance of email bounces. To learn more checkout Common Reasons for Suspension"></i>
                        </td>
                        <td>
                            <div class="stopped" data-tooltip="Email warmup stopped becasue of the technical issue. Click to know more.">
                                    <span class="badge-dot"></span>
                                    <span class="badge-label">Stopped</span>
                                </div>
                            </td>
                        <td>0</td>
                        <td>0</td>
                        <td>-</td>
                        <td>
                            <button class="custom-button11" toodle="Edit email" onclick="editEmailSettings(this)" data-bs-toggle="modal" data-bs-target="#modal-3" data-bs-dismiss="modal"><i class="bi bi-pencil"></i></button>
                            <button class="custom-button11" toodle="Report"><i class="bi bi-pie-chart"></i></button>
                            <button class="custom-button11" toodle="Connect"><i class="bi bi-link-45deg"></i></button>
                            <button class="custom-button11" toodle="Delete" onclick="deleteEmail(this)"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                `;
                    tableBody.insertAdjacentHTML('beforeend', row);
                });
            }
        }
        // Function to add a new email to the table and local storage
        function addNewEmail(email) {
            const tableBody = document.querySelector('.table_data');
            const row = `
                <tr>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck">
                        </div>
                    </td>
                    <td>
                        Usama<button class="small-disabled-button" disabled>SMTP</button><a href="#"
                            class="btn1 btn-default hide-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit
                            Email Setting</a>
                        <br>${email}<i class="bi bi-exclamation-circle question-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Running: Warmup is active
                        Paused: Warmup is Paused
                        Stopped: Warmup is Stopped due to SMTP/IMAP authentication issues, Email Account getting Disconnected. Kindly activate the warmup again.
                        Suspended: We suspended your Email Warm-up for your email account because we couldn't verify its validity. The suspension is due to a high chance of email bounces. To learn more checkout Common Reasons for Suspension"></i>
                    </td>
                    <td>
                        <div class="stopped" data-tooltip="Email warmup stopped becasue of the technical issue. Click to know more.">
                            <span class="badge-dot"></span>
                            <span class="badge-label">Stopped</span>
                        </div>
                    </td>
                    <td>0</td>
                    <td>0</td>
                    <td>-</td>
                    <td>
                        <button class="custom-button11"  data-bs-toggle="modal" data-bs-target="#modal-3" data-bs-dismiss="modal"><i class="bi bi-pencil"></i></button>
                        <button class="custom-button11" toodle="Report"><i class="bi bi-pie-chart"></i></button>
                        <button class="custom-button11" toodle="Connect"><i class="bi bi-link-45deg"></i></button>
                        <button class="custom-button11" toodle="Delete" onclick="deleteEmail(this)"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);

            // Update local storage
            const emails = JSON.parse(localStorage.getItem('emails'));
            emails.push(email);
            localStorage.setItem('emails', JSON.stringify(emails));
        }

        // Function to delete an email from the table and local storage
        function deleteEmail(button) {
            const row = button.closest('tr');
            const emailToDelete = row.querySelector('td:nth-child(2)').textContent.trim();

            // Remove row from the table
            row.remove();

            // Remove email from local storage
            let emails = JSON.parse(localStorage.getItem('emails'));
            emails = emails.filter(email => email !== emailToDelete);
            localStorage.setItem('emails', JSON.stringify(emails));
        }

        // Remove previously stored emails from local storage
        localStorage.removeItem('emails');

        // Initialize local storage with new emails
        initializeLocalStorage();

        // Populate the table
        populateTable();


        //tooltip add for actions icon
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });

        
    
// Function to update the email in the table and local storage
function updateEmail() {
    const newEmail = document.getElementById('newEmail').value.trim();
    if (!newEmail) {
        alert('Please enter a valid email address.');
        return;
    }

    const row = document.querySelector('.table_data tr.selected');
    if (!row) {
        alert('No email selected for update.');
        return;
    }

    // Get the email cell
    const emailCell = row.querySelector('td:nth-child(2)');

    // Get the original email
    const originalEmail = emailCell.textContent.trim();

    // Update the email in the table
    emailCell.innerHTML = `
        ${emailCell.innerHTML.split("<br>")[0]}<br>${newEmail}`;

    // Update email in local storage
    let emails = JSON.parse(localStorage.getItem('emails'));
    const index = emails.indexOf(originalEmail);
    if (index !== -1) {
        emails[index] = newEmail;
        localStorage.setItem('emails', JSON.stringify(emails));
    }

    // Close the modal
    const modal = document.getElementById('modal-3');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    if (bootstrapModal) { bootstrapModal.hide();
        setTimeout(function (){
            const removeModal = document.querySelectorAll('.modal-backdrop');
            removeModal.forEach((element) => {  
                element.classList.remove('show');  
                });  
        },1000)
    }
}
// Function to handle modal opening and selecting email for update
function editEmailSettings(button) {
    // Remove "selected" class from previously selected rows
    const previouslySelectedRow = document.querySelector('.table_data tr.selected');
    if (previouslySelectedRow) {
        previouslySelectedRow.classList.remove('selected');
    }

    // Add "selected" class to the current row
    const row = button.closest('tr');
    row.classList.add('selected');
}
