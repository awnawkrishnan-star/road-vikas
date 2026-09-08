const GOOGLE_APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyWr2MWYNOG2gi697HxkzBoGPuipdQ7ph66zl3TL2YHhS_2ANw39dMQoDBEiaTNsFns/exec";


document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("issueForm");

    // Check if form exists
    if (!form) {
        console.error("❌ issueForm not found!");
        return;
    }


    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        console.log("🚀 Form submitted");


        // ==========================================
        // GET FORM DATA
        // ==========================================

        const state =
            document.getElementById("state").value;

        const city =
            document.getElementById("city").value.trim();

        const locality =
            document.getElementById("locality").value.trim();

        const roadName =
            document.getElementById("roadName").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const description =
            document.getElementById("description").value.trim();


        // ==========================================
        // CREATE ISSUE NUMBER
        // ==========================================

        let issueNumber = Number(
            localStorage.getItem("roadVikasIssueNumber") || 0
        );

        issueNumber++;


        localStorage.setItem(
            "roadVikasIssueNumber",
            issueNumber
        );


        // ==========================================
        // DATE & TIME
        // ==========================================

        const now = new Date();


        const date =
            now.toLocaleDateString("en-GB");


        const time =
            now.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
            });


        // ==========================================
        // CREATE REPORT
        // ==========================================

        const issue = {

            id:
                "RV-" +
                now.getFullYear() +
                "-" +
                String(issueNumber).padStart(5, "0"),

            state: state,

            city: city,

            locality: locality,

            roadName: roadName,

            address: address,

            description: description,

            date: date,

            time: time,

            status: "Received"
        };


        console.log("📋 NEW REPORT:");
        console.log(issue);


        // ==========================================
        // SAVE CURRENT REPORT
        // ==========================================

        localStorage.removeItem("currentIssue");

        localStorage.setItem(
            "currentIssue",
            JSON.stringify(issue)
        );


        console.log(
            "💾 Saved to localStorage:"
        );

        console.log(
            localStorage.getItem("currentIssue")
        );


        // ==========================================
        // SEND TO GOOGLE SHEETS
        // ==========================================

        try {

            console.log(
                "📤 Sending data to Google Sheets..."
            );


            await fetch(
                GOOGLE_APPS_SCRIPT_URL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(issue)
                }
            );


            console.log(
                "✅ Data sent to Google Sheets!"
            );


        } catch (error) {

            console.error(
                "❌ Google Sheets error:",
                error
            );

        }


        // ==========================================
        // GO TO THANK YOU PAGE
        // ==========================================

        console.log(
            "➡️ Opening thankyou.html"
        );


        window.location.href =
            "thankyou.html";

    });

});