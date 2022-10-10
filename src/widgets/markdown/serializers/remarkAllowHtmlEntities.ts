/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-ts-comment */
export default function remarkAllowHtmlEntities() {
  // @ts-ignore
  this.Parser.prototype.inlineTokenizers.text = text;

  /**
   * This is a port of the `remark-parse` text tokenizer, adapted to exclude
   * HTML entity decoding.
   */
  function text(eat: any, value: any, silent: any) {
    // @ts-ignore
    const self = this;
    let index;
    let position;
    let tokenizer;
    let name;
    let min;

    /* istanbul ignore if - never used (yet) */
    if (silent) {
      return true;
    }

    const methods = self.inlineMethods;
    const length = methods.length;
    const tokenizers = self.inlineTokenizers;
    index = -1;
    min = value.length;

    while (++index < length) {
      name = methods[index];

      if (name === 'text' || !tokenizers[name]) {
        continue;
      }

      tokenizer = tokenizers[name].locator;

      if (!tokenizer) {
        eat.file.fail('Missing locator: `' + name + '`');
      }

      position = tokenizer.call(self, value, 1);

      if (position !== -1 && position < min) {
        min = position;
      }
    }

    const subvalue = value.slice(0, min);

    eat(subvalue)({
      type: 'text',
      value: subvalue,
    });
  }
}
