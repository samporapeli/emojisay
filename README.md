# emojisay

`cowsay`-inspired program, but with UTF-8 characters and emoji.
Written in TypeScript.
Runs with [deno](https://deno.land).

## Running
In project directory:
```zsh
deno run main.ts This is the text to be outputted
```
Output:
```
┌────────────────────────────────┐
│ This is the text to be         │
│ outputted                      │
└────────────────────────────────┘
    ╲  👂👂
     ╲  👀
        🐽
        👅
```

## Known issues
* More and better emojifiles required
    * A way for changing between emojifiles should be implemented, e.g. using command line arguments
* Does not read from stdin, only command line arguments
* Speech bubble is not resized as well as it could
* Long words are not split, but speech bubble should be extended instead
    * And well, this does not currently work
