import controlComponent from './BooleanControl';

function Widget(opts = {}) {
  return {
    name: 'boolean',
    controlComponent,
    ...opts,
  };
}

export const SimpleCmsWidgetBoolean = { Widget, controlComponent };
export default SimpleCmsWidgetBoolean;
