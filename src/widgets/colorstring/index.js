import controlComponent from './ColorControl';
import previewComponent from './ColorPreview';

function Widget(opts = {}) {
  return {
    name: 'color',
    controlComponent,
    previewComponent,
    ...opts,
  };
}

export const SimpleCmsWidgetColorString = { Widget, controlComponent, previewComponent };
export default SimpleCmsWidgetColorString;
