document.getElementById("button-addon2").addEventListener("click", async function () {
    const query = document.getElementById("query").value;
    if (!query.trim()) return;

    document.getElementById("query").value = ""; // clear textbox chuchu

    const loading = `
        <div id="loadingMessage" class="col" style="display: flex; flex-direction: column; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; align-items: center;">
                <div class="avatar avatar-lg me-3" style="margin-bottom: 16px;">
                    <img src="/resources/images/lnu-logo.png" width="70%" height="70%" alt="" srcset="">
                </div>
                <p>⏳ Thinking...<br>${new Date().toLocaleString()}</p>
            </div>
            <div class="card reply" style="max-width: 100%; display: inline-block;">
                <div class="card-body">
                    <h4 style="line-height: 1.5; color: white;">CampusWise is thinking...</h4>
                </div>
            </div>
        </div>
    `;

    const userMessage = `
        <div class="col" style="display: flex; flex-direction: column; align-items: flex-end;">
            <div style="display: flex; flex-direction: row; align-items: start; text-align: end; max-width: fit-content;">
                <p style="margin-right: 8px;">💬 Sent by Test Student<br>${new Date().toLocaleString()}</p>
                <div class="avatar avatar-lg" style="margin-bottom: 16px; margin-left: 8px; background-color: rgb(8, 2, 130);">
                    <div class="avatar-content">TS</div>
                </div>
            </div>
            <div class="card message" style="max-width: 100%; display: inline-block;">
                <div class="card-body">
                    <h4 style="line-height: 1.5; overflow-wrap: anywhere;">${query}</h4>
                </div>
            </div>
        </div>
    `;
    document.getElementById("conversation-container").innerHTML += userMessage;
    
    isGenerating = false;

    document.getElementById("conversation-container").innerHTML += loading;

    try {
        isGenerating = true;
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const aiMessage = `
            <div class="col" style="display: flex; flex-direction: column; align-items: flex-start;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                    <div class="avatar avatar-lg me-3" style="margin-bottom: 16px;">
                        <img src="/resources/images/lnu-logo.png" width="70%" height="70%" alt="" srcset="">
                    </div>
                    <p>💬 CampusWise replied<br>${new Date().toLocaleString()}</p>
                </div>
                <div class="card reply" style="max-width: 100%; display: inline-block;">
                    <div class="card-body">
                        <h4 class="text" style="line-height: 1.5; color: white;">${data.response}</h4>
                    </div>
                </div>
            </div>
        `;
        document.getElementById("conversation-container").innerHTML += aiMessage;

        isGenerating = false;

        if (!isGenerating) {
            loadingMessage.style.display = "none";
        }

        const oldLoadingMsg = document.getElementById("loadingMessage");
        oldLoadingMsg.id = "oldLoadingMessage";

        document.getElementById("conversation-container").scrollTop = document.getElementById("conversation-container").scrollHeight;
    } catch (error) {
        console.error("Error fetching AI response:", error);
    }
});