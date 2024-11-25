document.addEventListener('DOMContentLoaded', function () {
    const votingForm = document.querySelector('form[action="submit_all_votes"]');

    votingForm.addEventListener('submit', function (event) {
        event.preventDefault();  

        const candidateFTD = document.querySelector('input[name="candidate_ftd"]:checked');
        const candidateASD = document.querySelector('input[name="candidate_asd"]:checked');
        const candidateSEU = document.querySelector('input[name="candidate_seu"]:checked');
        const candidateMPU = document.querySelector('input[name="candidate_mpu"]:checked');

        const discordId = document.querySelector('input[name="discord_id"]').value;

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

        const voteData = {
            "FTD Head": candidateFTD.value,
            "ASD Head": candidateASD.value,
            "SEU Head": candidateSEU.value,
            "MPU Head": candidateMPU.value,
            "Discord ID": discordId 
        };

        sendVotesToDiscord(voteData)
            .then(() => {
               
                votingForm.reset();
                alert('Votes submitted successfully!');
            })
            .catch(error => {
                console.error('Error submitting votes:', error);
                alert('There was an error submitting your votes. Please try again.');
            });
    });
});

function sendVotesToDiscord(voteData) {
    const webhookUrl = 'https://discord.com/api/webhooks/1308477666617331732/B1Zjt_i8AEL9f8Pr9JblP9mypLxwcb7gtdPecUYzgJcGDCp-s3Wi99XeBWI4fcOyBgIO'; 
    const messageContent = {
        embeds: [{
            color: 3447003, 
            title: `SALE Voting Submission`,
            description: `Votes from <@${voteData["Discord ID"]}>`,
            fields: [
                { name: 'FTD Head', value: voteData["FTD Head"], inline: true },
                { name: 'ASD Head', value: voteData["ASD Head"], inline: true },
                { name: 'SEU Head', value: voteData["SEU Head"], inline: true },
                { name: 'MPU Head', value: voteData["MPU Head"], inline: true }
            ],
            timestamp: new Date(), 
            footer: {
                text: 'Thank you for participating!'
            }
        }]
    };

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
