export default function classNames(...classes: (string | undefined | null | false)[]) {
  const filteredClasses = classes.filter(Boolean) as string[];

  return filteredClasses
    .map(value => value.replace(/\n/g, ' ').replace(/[ ]+/g, ' ').trim())
    .join(' ');
}
