import controlComponent from './BooleanControl';

function Widget(opts = {}) {
  return {
    name: 'boolean',
    controlComponent,
    ...opts,
  };
}

export const StaticCmsWidgetBoolean = { Widget, controlComponent };
export default StaticCmsWidgetBoolean;
