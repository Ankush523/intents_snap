import { heading, panel, text } from "@metamask/snaps-ui";

export async function decodeIntent(intentMsg : any) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({"body":`${intentMsg}`}),
    };
  
    const response  = await fetch('http://localhost:3000/completion', options);
    const data = await response.json();
    await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading('Transaction Successful'),
            text(`Transaction hash is : ${data}`),
          ]),
        },
    });
}
