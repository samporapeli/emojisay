const arg: { [key: string]: any } = {
    file: 'emojicow',
    words: Deno.args,
}

if (Deno.args.includes('-f')) {
    const flagIndex = Deno.args.indexOf('-f')
    arg.file = Deno.args[flagIndex + 1]
    arg.words = [...Deno.args]
    delete arg.words[flagIndex + 1]
    delete arg.words[flagIndex]
}

const speechBubble = (message: string) => {
    const words = message.split(' ')
    const longestWord = words.length > 0
        ? words.reduce(
            (longest, current) =>
                current.length > longest.length ? current : longest
        )
        : ''
    const lineLength: number = Math.max(32, longestWord.length)

    let formattedMessage: string = ''
    let currentLine: string = ''
    for (let word of words) {
        if ((currentLine + word).length < lineLength) currentLine += `${word} `
        else {
            currentLine += '\n'
            formattedMessage += currentLine
            currentLine = word + ' '
        }
    }
    formattedMessage += currentLine
    
    const rows: string[] = formattedMessage.split('\n')
    // words are now nicely placed and put into rows
    let bubble: string = `┌${'─'.repeat(lineLength)}┐`
    for (let i: number = 0; i < rows.length; i++) {
        const row: string = rows[i]
        bubble += '\n'
        const padding: string = ' '.repeat(lineLength - row.length - 2)
        bubble += `│ ${row + padding} │`
    }
    bubble += `\n└${'─'.repeat(lineLength)}┘`
    return bubble
}

const emojifiles: { [name: string]: string } = {
    emojicow: `
    ╲  👂👂
     ╲  👀
        🐽 
        👅
    `,
    cowEmoji: `
    ╲
     ╲
      🐄
    `,
    farm: `
   ╲
    ╲
   🐖🐎 🌱 🐄
    `
}

const message: string = arg.words.join(' ')
const emojifile: string = emojifiles[arg.file] ? arg.file : 'emojicow'
console.log(speechBubble(message) + emojifiles[emojifile])
