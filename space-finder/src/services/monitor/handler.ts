import { SNSEvent } from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/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';

async function handler(event: SNSEvent, context) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Huston, we have a problem: ${record.Sns.Message}`
            })
        })
    }
}

export { handler }