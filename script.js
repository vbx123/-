
// Define global variables
let userName, category, friends, greetingLink;

// DOMContentLoaded ensures the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Handle the main form submission (index.html)
    const userForm = document.getElementById("userForm");
    const adminLogin = document.getElementById("adminLogin");
    const password = "1234567890"; // Admin password

    if (userForm) {
        userForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Get user inputs
            userName = document.getElementById("userName").value.trim();
            category = document.getElementById("category").value;
            friends = document
                .getElementById("friends")
                .value.trim()
                .split(",")
                .map((name) => name.trim())
                .filter((name) => name); // Clean up names

            // Generate the personalized greeting link
            greetingLink = `${window.location.origin}/greeting.html?name=${encodeURIComponent(
                userName
            )}&category=${encodeURIComponent(
                category
            )}&friends=${encodeURIComponent(friends.join(","))}`;

            // Redirect to the greeting page
            window.location.href = greetingLink;
        });
    }

    // Handle admin login (admin.html)
    if (adminLogin) {
        adminLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputPassword = document.getElementById("password").value;

            if (inputPassword === password) {
                document.getElementById("adminStats").classList.remove("hidden");
                adminLogin.style.display = "none";
                loadStats();
            } else {
                alert("كلمة السر غير صحيحة!");
            }
        });
    }

    // Populate data on the greeting page
    if (window.location.pathname.includes("greeting.html")) {
        displayGreetingPage();
    }
});

// Function to display the greeting page content dynamically
function displayGreetingPage() {
    const params = new URLSearchParams(window.location.search);

    const userGreeting = document.getElementById("userGreeting");
    const categoryMessage = document.getElementById("categoryMessage");
    const friendsList = document.getElementById("friendsList");
    const copyLinkButton = document.getElementById("copyLink");

    const userName = params.get("name") || "ضيف";
    const category = params.get("category");
    const friends = (params.get("friends") || "").split(",");

    const messages = {
        family: "عائلتي الحبيبة، مع قدوم رمضان، يا رب يكون شهر مليان خير وبركة عليكم.",
        parents: "أمي وأبويا الغاليين، رمضان كريم عليكم. يا رب يجعل أيامكم كلها سعادة، ويتقبل دعاءكم وصيامكم.",
        siblings: "إخواتي الغاليين، رمضان كريم عليكم، يا رب يكون شهر خير وبركة عليكم.",
        friends: "كل سنة وانتو طيبين يا أعز الناس، رمضانكم مبارك وأيامكم كلها سعادة وفرحة.",
        children: "رمضان قرب، يا رب يكون شهر مليان بالفرحة والطاعة ليكم يا أغلى ما عندي.",
    };

    // Update greeting texts dynamically
    userGreeting.innerHTML = `${userName} يهنئكم بقدوم رمضان!`;
    categoryMessage.innerHTML = messages[category] || "رمضان كريم!";
    friendsList.innerHTML = friends
        .map((friend) => `<span class="highlight">${friend}</span>`)
        .join(", ") + `: رمضان كريم، أعاده الله عليكم بالصحة والعافية.`;

    // Set up copy link button
    copyLinkButton.addEventListener("click", () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("تم نسخ الرابط بنجاح!");
        });
    });
}

// Function to load admin stats (admin.html)
function loadStats() {
    const statsContainer = document.getElementById("statsContainer");

    // Mock data for demonstration
    const stats = {
        totalGreetings: 42,
        categoryCounts: {
            family: 10,
            parents: 8,
            siblings: 6,
            friends: 12,
            children: 6,
        },
    };

    // Populate stats dynamically
    statsContainer.innerHTML = `
        <p>إجمالي التهاني: ${stats.totalGreetings}</p>
        <ul>
            ${Object.entries(stats.categoryCounts)
                .map(
                    ([key, value]) =>
                        `<li>${key}: ${value} تهنئة</li>`
                )
                .join("")}
        </ul>`;
}


