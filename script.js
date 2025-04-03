document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("imageInput");
    const removeBtn = document.getElementById("removeBtn");
    const outputImage = document.getElementById("outputImage");
    const downloadBtn = document.getElementById("downloadBtn");
    const adminLogin = document.getElementById("adminLogin");
    const adminPanel = document.getElementById("adminPanel");
    const generateBtn = document.getElementById("generateBtn");
    const promptInput = document.getElementById("promptInput");
    const generatedImage = document.getElementById("generatedImage");
    const adminCredentials = { username: "admin", password: "admin123" };
    
    // Drag & Drop Feature
    const dropArea = document.getElementById("dropArea");
    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
    });
    dropArea.addEventListener("dragleave", () => dropArea.classList.remove("active"));
    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dropArea.classList.remove("active");
        input.files = event.dataTransfer.files;
    });

    removeBtn.addEventListener("click", async () => {
        if (input.files.length === 0) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image_file", input.files[0]);
        formData.append("size", "auto");

        try {
            const response = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST",
                headers: { "X-Api-Key": "awDzw2SQrya4sRw6YgTeHVFW" },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to remove background");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            outputImage.src = url;
            outputImage.style.display = "block";
            downloadBtn.href = url;
            downloadBtn.style.display = "inline-block";
        } catch (error) {
            console.error(error);
            alert("Error removing background. Please try again.");
        }
    });

    // Image Generation Feature
    generateBtn.addEventListener("click", async () => {
        const prompt = promptInput.value;
        if (!prompt) {
            alert("Please enter a description for the image.");
            return;
        }

        try {
            const response = await fetch("https://api.deepai.org/api/text2img", {
                method: "POST",
                headers: { "Api-Key": "0a0b2c6c-1652-43ca-ad24-4bd207c21301" },
                body: JSON.stringify({ text: prompt })
            });

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            const data = await response.json();
            generatedImage.src = data.output_url;
            generatedImage.style.display = "block";
        } catch (error) {
            console.error(error);
            alert("Error generating image. Please try again.");
        }
    });

    // Admin Login System
    document.getElementById("adminBtn").addEventListener("click", function () {
        let username = prompt("Enter Admin Username:");
        let password = prompt("Enter Admin Password:");

        if (username === adminCredentials.username && password === adminCredentials.password) {
            adminLogin.style.display = "none";
            adminPanel.style.display = "block";
        } else {
            alert("Incorrect username or password!");
        }
    });

    document.getElementById("logoutBtn").addEventListener("click", function () {
        adminLogin.style.display = "block";
        adminPanel.style.display = "none";
    });
});
