// ===============================
// EventFlow - TechConnect 2026
// Main JavaScript
// ===============================

const REGISTRATION_KEY = "eventFlowRegistrations";
const SETTINGS_KEY = "eventFlowSettings";
const SCHEDULE_KEY = "eventFlowSchedule";

// -------------------------------
// Default Event Settings
// -------------------------------

const defaultSettings = {
    title: "TechConnect 2026",
    tagline: "Student Technology Meetup",
    date: "15 November 2026",
    venue: "Tech Innovation Hall",
    capacity: 100
};

const defaultSchedule = [
    {
        time: "09:00 AM",
        title: "Registration & Welcome",
        description: "Check-in, attendee verification and welcome session."
    },
    {
        time: "10:00 AM",
        title: "Future of Web Development",
        description: "Explore modern web development practices and technologies."
    },
    {
        time: "12:00 PM",
        title: "Cloud & AI Innovation",
        description: "Learn how cloud computing and AI are changing technology."
    },
    {
        time: "02:00 PM",
        title: "Networking & Closing",
        description: "Connect with participants and wrap up the event."
    }
];

// -------------------------------
// Local Storage Functions
// -------------------------------

function getRegistrations() {
    try {
        return JSON.parse(localStorage.getItem(REGISTRATION_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveRegistrations(data) {
    localStorage.setItem(REGISTRATION_KEY, JSON.stringify(data));
}

function getSettings() {
    try {
        return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings;
    } catch (error) {
        return defaultSettings;
    }
}

function saveSettings(data) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
}

function getSchedule() {
    try {
        return JSON.parse(localStorage.getItem(SCHEDULE_KEY)) || defaultSchedule;
    } catch (error) {
        return defaultSchedule;
    }
}

function saveSchedule(data) {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(data));
}

// -------------------------------
// Mobile Menu
// -------------------------------

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });
    });
}

// -------------------------------
// Error Functions
// -------------------------------

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    if (input) {
        input.classList.add("input-error");
        input.setAttribute("aria-invalid", "true");
    }

    if (error) {
        error.textContent = message;
        error.style.color = "red";
        error.style.display = "block";
    }
}

function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    if (input) {
        input.classList.remove("input-error");
        input.removeAttribute("aria-invalid");
    }

    if (error) {
        error.textContent = "";
        error.style.display = "none";
    }
}

function clearAllRegistrationErrors() {
    clearError("name", "nameError");
    clearError("email", "emailError");
    clearError("phone", "phoneError");
    clearError("category", "categoryError");
}

// -------------------------------
// Registration Validation
// -------------------------------

function validateRegistrationForm() {
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const category = document.getElementById("category").value;

    clearAllRegistrationErrors();

    // Name validation
    if (name === "") {
        showError(
            "name",
            "nameError",
            "Please enter your full name."
        );
        isValid = false;
    } else if (name.length < 3) {
        showError(
            "name",
            "nameError",
            "Name must contain at least 3 characters."
        );
        isValid = false;
    } else if (!/^[A-Za-z .'-]+$/.test(name)) {
        showError(
            "name",
            "nameError",
            "Name can contain only letters and spaces."
        );
        isValid = false;
    }

    // Email validation
    if (email === "") {
        showError(
            "email",
            "emailError",
            "Please enter your email address."
        );
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(
            "email",
            "emailError",
            "Please enter a valid email address."
        );
        isValid = false;
    }

    // Phone validation
    if (phone === "") {
        showError(
            "phone",
            "phoneError",
            "Please enter your phone number."
        );
        isValid = false;
    } else if (!/^[6-9][0-9]{9}$/.test(phone)) {
        showError(
            "phone",
            "phoneError",
            "Please enter a valid 10-digit Indian phone number."
        );
        isValid = false;
    }

    // Category validation
    if (category === "") {
        showError(
            "category",
            "categoryError",
            "Please select your category."
        );
        isValid = false;
    }

    return isValid;
}

// -------------------------------
// Registration Form
// -------------------------------

const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {

    registrationForm.addEventListener("submit", function (event) {

        // VERY IMPORTANT:
        // Stop page refresh
        event.preventDefault();
        event.stopPropagation();

        const messageBox = document.getElementById("registrationMessage");
        const successBox = document.getElementById("registrationSuccess");

        if (messageBox) {
            messageBox.textContent = "";
            messageBox.style.display = "none";
        }

        if (successBox) {
            successBox.style.display = "none";
        }

        // Validate form
        const isValid = validateRegistrationForm();

        // If validation fails, STOP here
        if (!isValid) {
            return false;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const category = document.getElementById("category").value;

        const registrations = getRegistrations();
        const settings = getSettings();

        // Capacity check
        if (registrations.length >= Number(settings.capacity)) {

            if (messageBox) {
                messageBox.textContent =
                    "Registration is currently full. No seats are available.";
                messageBox.style.color = "red";
                messageBox.style.display = "block";
            }

            return false;
        }

        // Duplicate email check
        const emailExists = registrations.some(function (registration) {
            return registration.email.toLowerCase() === email;
        });

        if (emailExists) {

            showError(
                "email",
                "emailError",
                "This email is already registered."
            );

            return false;
        }

        // Duplicate phone check
        const phoneExists = registrations.some(function (registration) {
            return registration.phone === phone;
        });

        if (phoneExists) {

            showError(
                "phone",
                "phoneError",
                "This phone number is already registered."
            );

            return false;
        }

        // Generate unique Registration ID
        let registrationId;

        do {
            const randomNumber =
                Math.floor(10000 + Math.random() * 90000);

            registrationId = "EVT" + randomNumber;

        } while (
            registrations.some(function (registration) {
                return registration.id === registrationId;
            })
        );
        // Create registration object
        const newRegistration = {
            id: registrationId,
            name: name,
            email: email,
            phone: phone,
            category: category,
            status: "Confirmed",
            registeredAt: new Date().toLocaleString("en-IN")
        };

        // Save registration
        registrations.push(newRegistration);
        saveRegistrations(registrations);

        // Show success message
        if (messageBox) {
            messageBox.textContent =
                "Registration completed successfully!";
            messageBox.style.color = "green";
            messageBox.style.display = "block";
        }

        // Show Registration ID
        const generatedId =
            document.getElementById("generatedRegistrationId");

        if (generatedId) {
            generatedId.textContent = registrationId;
        }

        if (successBox) {
            successBox.style.display = "block";
        }

        // Reset form
        registrationForm.reset();

        clearAllRegistrationErrors();

        // Update statistics
        updateStatistics();

        // Scroll to success message
        if (successBox) {
            setTimeout(function () {
                successBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 100);
        }

        return false;
    });
}

// -------------------------------
// Live Validation
// -------------------------------

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const categoryInput = document.getElementById("category");

if (nameInput) {
    nameInput.addEventListener("input", function () {
        clearError("name", "nameError");
    });
}

if (emailInput) {
    emailInput.addEventListener("input", function () {
        clearError("email", "emailError");
    });
}

if (phoneInput) {
    phoneInput.addEventListener("input", function () {

        // Allow only numbers
        this.value = this.value.replace(/\D/g, "");

        clearError("phone", "phoneError");
    });
}

if (categoryInput) {
    categoryInput.addEventListener("change", function () {
        clearError("category", "categoryError");
    });
}
// -------------------------------
// Status Lookup
// -------------------------------

const statusForm = document.getElementById("statusForm");

if (statusForm) {

    statusForm.addEventListener("submit", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const input =
            document.getElementById("registrationId");

        const error =
            document.getElementById("statusError");

        const result =
            document.getElementById("statusResult");

        const registrationId =
            input.value.trim().toUpperCase();

        if (error) {
            error.textContent = "";
            error.style.display = "none";
        }

        if (result) {
            result.innerHTML = "";
            result.style.display = "none";
        }

        // Empty ID
        if (registrationId === "") {

            if (error) {
                error.textContent =
                    "Please enter your Registration ID.";
                error.style.color = "red";
                error.style.display = "block";
            }

            return false;
        }

        // ID format
        if (!/^EVT[0-9]{5}$/.test(registrationId)) {

            if (error) {
                error.textContent =
                    "Invalid Registration ID. Example: EVT12345";
                error.style.color = "red";
                error.style.display = "block";
            }

            return false;
        }

        const registrations = getRegistrations();

        const registration =
            registrations.find(function (item) {
                return item.id === registrationId;
            });

        // ID not found
        if (!registration) {

            if (error) {
                error.textContent =
                    "Registration ID not found. Please check your ID.";
                error.style.color = "red";
                error.style.display = "block";
            }

            return false;
        }

        // Show result
        if (result) {

            result.innerHTML = `
                <div class="status-card">
                    <h3>Registration Found</h3>

                    <p>
                        <strong>Name:</strong>
                        ${escapeHTML(registration.name)}
                    </p>

                    <p>
                        <strong>Registration ID:</strong>
                        ${escapeHTML(registration.id)}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${escapeHTML(registration.email)}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${escapeHTML(registration.phone)}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${escapeHTML(registration.category)}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        <span class="confirmed-status">
                            ${escapeHTML(registration.status)}
                        </span>
                    </p>

                    <p>
                        <strong>Registered On:</strong>
                        ${escapeHTML(registration.registeredAt)}
                    </p>
                </div>
            `;

            result.style.display = "block";
        }

        return false;
    });
}
// -------------------------------
// Admin Event Settings
// -------------------------------

const eventSettingsForm =
    document.getElementById("eventSettingsForm");

if (eventSettingsForm) {

    eventSettingsForm.addEventListener("submit", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const title =
            document.getElementById("adminEventTitle").value.trim();

        const tagline =
            document.getElementById("adminEventTagline").value.trim();

        const date =
            document.getElementById("adminEventDate").value.trim();

        const venue =
            document.getElementById("adminEventVenue").value.trim();

        const capacity =
            Number(document.getElementById("adminEventCapacity").value);

        const message =
            document.getElementById("adminMessage");

        const registrations = getRegistrations();

        if (title === "" ||
            tagline === "" ||
            date === "" ||
            venue === "") {

            if (message) {
                message.textContent =
                    "Please complete all event settings.";
                message.style.color = "red";
            }

            return false;
        }

        if (!Number.isInteger(capacity) ||
            capacity < 1 ||
            capacity > 10000) {

            if (message) {
                message.textContent =
                    "Capacity must be between 1 and 10,000.";
                message.style.color = "red";
            }

            return false;
        }

        if (capacity < registrations.length) {

            if (message) {
                message.textContent =
                    "Capacity cannot be lower than current registrations.";
                message.style.color = "red";
            }

            return false;
        }

        const updatedSettings = {
            title: title,
            tagline: tagline,
            date: date,
            venue: venue,
            capacity: capacity
        };

        saveSettings(updatedSettings);

        applySettings();
        updateStatistics();

        if (message) {
            message.textContent =
                "Event settings updated successfully.";
            message.style.color = "green";
        }

        return false;
    });
}
// -------------------------------
// Apply Event Settings
// -------------------------------

function applySettings() {

    const settings = getSettings();

    const eventTitle =
        document.getElementById("eventTitle");

    const eventTagline =
        document.getElementById("eventTagline");

    const eventDate =
        document.getElementById("eventDate");

    const eventVenue =
        document.getElementById("eventVenue");

    const capacityDisplay =
        document.getElementById("capacityDisplay");

    if (eventTitle)
        eventTitle.textContent = settings.title;

    if (eventTagline)
        eventTagline.textContent = settings.tagline;

    if (eventDate)
        eventDate.textContent = settings.date;

    if (eventVenue)
        eventVenue.textContent = settings.venue;

    if (capacityDisplay)
        capacityDisplay.textContent = settings.capacity;

    // Admin fields
    const adminTitle =
        document.getElementById("adminEventTitle");

    const adminTagline =
        document.getElementById("adminEventTagline");

    const adminDate =
        document.getElementById("adminEventDate");

    const adminVenue =
        document.getElementById("adminEventVenue");

    const adminCapacity =
        document.getElementById("adminEventCapacity");

    if (adminTitle)
        adminTitle.value = settings.title;

    if (adminTagline)
        adminTagline.value = settings.tagline;

    if (adminDate)
        adminDate.value = settings.date;

    if (adminVenue)
        adminVenue.value = settings.venue;

    if (adminCapacity)
        adminCapacity.value = settings.capacity;

    // Short date in statistics
    const statDate =
        document.getElementById("statDate");

    if (statDate) {
        statDate.textContent =
            formatShortDate(settings.date);
    }
}
// -------------------------------
// Update Statistics
// -------------------------------

function updateStatistics() {

    const registrations = getRegistrations();
    const settings = getSettings();

    const total =
        registrations.length;

    const capacity =
        Number(settings.capacity);

    const remaining =
        Math.max(capacity - total, 0);

    const totalRegistrations =
        document.getElementById("totalRegistrations");

    const adminTotal =
        document.getElementById("adminTotalRegistrations");

    const adminCapacity =
        document.getElementById("adminCapacity");

    const adminRemaining =
        document.getElementById("adminRemainingSeats");

    const availabilityStatus =
        document.getElementById("availabilityStatus");

    const registerButton =
        document.getElementById("registerButton");

    if (totalRegistrations)
        totalRegistrations.textContent = total;

    if (adminTotal)
        adminTotal.textContent = total;

    if (adminCapacity)
        adminCapacity.textContent = capacity;

    if (adminRemaining)
        adminRemaining.textContent = remaining;

    if (availabilityStatus) {

        if (remaining === 0) {

            availabilityStatus.textContent = "Full";

        } else if (remaining <= 10) {

            availabilityStatus.textContent = "Limited";

        } else {

            availabilityStatus.textContent = "Open";
        }
    }

    if (registerButton) {

        if (remaining === 0) {

            registerButton.disabled = true;
            registerButton.textContent =
                "Registration Full";

        } else {

            registerButton.disabled = false;
            registerButton.textContent =
                "Complete Registration";
        }
    }
}

// -------------------------------
// Schedule Management
// -------------------------------

const scheduleForm =
    document.getElementById("scheduleForm");

if (scheduleForm) {

    scheduleForm.addEventListener("submit", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const time =
            document.getElementById("sessionTime").value.trim();

        const title =
            document.getElementById("sessionTitle").value.trim();

        const description =
            document.getElementById("sessionDescription").value.trim();

        if (time === "" ||
            title === "" ||
            description === "") {

            alert("Please complete all schedule fields.");
            return false;
        }

        const schedule = getSchedule();

        schedule.push({
            time: time,
            title: title,
            description: description
        });

        saveSchedule(schedule);

        renderSchedule();
        renderAdminSchedule();

        scheduleForm.reset();

        return false;
    });
}
// -------------------------------
// Public Schedule
// -------------------------------

function renderSchedule() {

    const scheduleList =
        document.getElementById("scheduleList");

    const sessionCount =
        document.getElementById("sessionCount");

    if (!scheduleList) return;

    const schedule = getSchedule();

    scheduleList.innerHTML = "";

    schedule.forEach(function (session) {

        const item = document.createElement("div");

        item.className = "timeline-item";

        item.innerHTML = `
            <div class="timeline-time">
                ${escapeHTML(session.time)}
            </div>

            <div class="timeline-content">
                <h3>${escapeHTML(session.title)}</h3>
                <p>${escapeHTML(session.description)}</p>
            </div>
        `;

        scheduleList.appendChild(item);
    });

    if (sessionCount) {
        sessionCount.textContent = schedule.length;
    }
}

// -------------------------------
// Admin Schedule
// -------------------------------

function renderAdminSchedule() {

    const adminScheduleList =
        document.getElementById("adminScheduleList");

    if (!adminScheduleList) return;

    const schedule = getSchedule();

    adminScheduleList.innerHTML = "";

    schedule.forEach(function (session, index) {

        const item =
            document.createElement("div");

        item.className = "admin-session";

        item.innerHTML = `
            <div>
                <strong>${escapeHTML(session.time)}</strong>
                <h4>${escapeHTML(session.title)}</h4>
                <p>${escapeHTML(session.description)}</p>
            </div>

            <button
                type="button"
                class="delete-session"
                onclick="deleteSession(${index})">
                Delete
            </button>
        `;

        adminScheduleList.appendChild(item);
    });
}

// -------------------------------
// Delete Schedule Session
// -------------------------------

function deleteSession(index) {

    const schedule = getSchedule();

    if (!schedule[index]) return;

    const confirmDelete =
        confirm("Are you sure you want to delete this session?");

    if (!confirmDelete) return;

    schedule.splice(index, 1);

    saveSchedule(schedule);

    renderSchedule();
    renderAdminSchedule();
}

// -------------------------------
// Security Helper
// -------------------------------

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
// -------------------------------
// Short Date
// -------------------------------

function formatShortDate(dateText) {

    const parts = dateText.split(" ");

    if (parts.length >= 3) {
        return parts[0] + " " + parts[1];
    }

    return dateText;
}

// -------------------------------
// Initialize Application
// -------------------------------

function initializeApp() {

    if (!localStorage.getItem(SETTINGS_KEY)) {
        saveSettings(defaultSettings);
    }

    if (!localStorage.getItem(SCHEDULE_KEY)) {
        saveSchedule(defaultSchedule);
    }

    if (!localStorage.getItem(REGISTRATION_KEY)) {
        saveRegistrations([]);
    }

    applySettings();
    updateStatistics();
    renderSchedule();
    renderAdminSchedule();
}

// Start Application
initializeApp();