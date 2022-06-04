import { ClientBuilder } from '@iota/client'

import { config } from './config'
import 'dotenv/config'
import { sleep } from './utils/process'

async function run() {
  console.log(`Connecting to ${process.env.API_ENDPOINT}`)

  try {
    const client = new ClientBuilder().node(config.API_ENDPOINT).build()

    const info = await client.getInfo()
    const { nodeinfo } = info

    console.log(`Node info`, nodeinfo)

    const loop = 0.999
    while (loop < 1) {
      process.stdout.write(`Sending message... `)
      const message = await client
        .message()
        .index('iota.in.net Spammer')
        .data('Hello world')
        .submit()

      console.log(message.messageId ? '✅' : '❌')
      console.log(message.messageId ? `${message.messageId}\n` : 'Error\n')

      //console.log(`Message sent`, message)

      await sleep(5000)
    }
  } catch (error) {
    console.log(error)
  }
}

run()
  .then(() => console.log('Done'))
  .catch((err) => console.error(err))
