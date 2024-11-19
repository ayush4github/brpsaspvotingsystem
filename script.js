// Wait for the document to fully load before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Get the voting form element
    const votingForm = document.querySelector('form[action="submit_all_votes"]');

    // Add an event listener to handle voting form submission
    votingForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the default form submission

        // Get selected votes
        const candidateFTD = document.querySelector('input[name="candidate_ftd"]:checked');
        const candidateASD = document.querySelector('input[name="candidate_asd"]:checked');
        const candidateSEU = document.querySelector('input[name="candidate_seu"]:checked');
        const candidateMPU = document.querySelector('input[name="candidate_mpu"]:checked');

        // Get the Discord ID from the input
        const discordId = document.querySelector('input[name="discord_id"]').value;

        // Check if all votes are selected
        if (!candidateFTD) {
            alert('Please vote for the FTD Head.');
            return;
        }
        if (!candidateASD) {
            alert('Please vote for the ASD Head.');
            return;
        }
        if (!candidateSEU) {
            alert('Please vote for the SEU Head.');
            return;
        }
        if (!candidateMPU) {
            alert('Please vote for the MPU Head.');
            return;
        }
        if (!discordId) {
            alert('Please enter your Discord ID.');
            return;
        }

        // Prepare the vote data
        const voteData = {
            "FTD Head": candidateFTD.value,
            "ASD Head": candidateASD.value,
            "SEU Head": candidateSEU.value,
            "MPU Head": candidateMPU.value,
            "Discord ID": discordId // Include the Discord ID in the vote data
        };

        // Send the vote to Discord webhook
        sendVotesToDiscord(voteData)
            .then(() => {
                // Reset the form after successful submission
                votingForm.reset();
                // Show a success message to the user
                alert('Votes submitted successfully!');
            })
            .catch(error => {
                console.error('Error submitting votes:', error);
                alert('There was an error submitting your votes. Please try again.');
            });
    });
});

// Function to send the vote result to Discord webhook
function sendVotesToDiscord(voteData) {
    const webhookUrl = 'https://discord.com/api/webhooks/1308477666617331732/B1Zjt_i8AEL9f8Pr9JblP9mypLxwcb7gtdPecUYzgJcGDCp-s3Wi99XeBWI4fcOyBgIO'; // Replace with your Discord Webhook URL

    // Prepare the message for the Discord webhook
    const messageContent = {
        embeds: [{
            color: 3447003, // Color of the embed box (optional)
            title: `SALE Voting Submission`,
            description: `Votes from <@${voteData["Discord ID"]}>`,
            fields: [
                { name: 'FTD Head', value: voteData["FTD Head"], inline: true },
                { name: 'ASD Head', value: voteData["ASD Head"], inline: true },
                { name: 'SEU Head', value: voteData["SEU Head"], inline: true },
                { name: 'MPU Head', value: voteData["MPU Head"], inline: true }
            ],
            timestamp: new Date(), // Timestamp of the submission
            footer: {
                text: 'Thank you for participating!'
            }
        }]
    };

    // Send the data to Discord using fetch API
    return fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageContent)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log('Vote sent successfully to Discord.');
    });
}
