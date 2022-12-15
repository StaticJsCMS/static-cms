export default function consoleError(title: string, description: string) {
  console.error(
    `%c ⛔ ${title}\n` + `%c${description}\n\n`,
    'color: black; font-weight: bold; font-size: 16px; line-height: 50px;',
    'color: black;',
  );
}
