import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';
import { getSmartAccount } from './getSmartAccount';
import { decodeIntent } from './sendTx';


export const onRpcRequest: OnRpcRequestHandler =async ({ origin, request }) => {
  const simpleAcc = await getSmartAccount();
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    
      case 'getSCW':
        const scwAddress = simpleAcc.getSender();
        return snap.request({
          method: 'snap_dialog',
          params: {
            type: 'confirmation',
            content: panel([
              heading('SCW Account Details'),
              text(`SCW Address is : ${scwAddress}`),
            ]),
          },
        });
      
      case 'sendAATx':
        const intentMsg : any = await snap.request({
          method: 'snap_dialog',
          params: {
            type: 'prompt',
            content: panel([
              heading('Type your Intent here'),
              text('Please enter the intent text below'),
            ]),
            placeholder: 'abc...',
          },
        });
        await decodeIntent(intentMsg);
        break;
    default:
      throw new Error('Method not found.');
  }
};
