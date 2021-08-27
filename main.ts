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
    let bubble: string = ` ${'_'.repeat(lineLength)} `
    for (let i: number = 0; i < rows.length; i++) {
        const row: string = rows[i]
        bubble += '\n'
        const padding: string = ' '.repeat(lineLength - row.length - 2)
        if (rows.length === 1) bubble += `< ${row + padding} >`
        else if (i === 0) bubble += `/ ${row + padding} \\`
        else if (i < rows.length - 1) bubble += `| ${row + padding} |`
        else if (i === rows.length - 1) bubble += `\\ ${row + padding} /`
    }
    bubble += `\n ${'-'.repeat(lineLength)}`
    return bubble
}

const emojifiles = {
    emojicow: `
    ╲  👂👂
     ╲  👀
        🐽 
        👅
    `
}

const message: string = Deno.args.join(' ')
console.log(speechBubble(message) + emojifiles.emojicow)
