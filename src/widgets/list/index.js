import SimpleCmsWidgetObject from '../object';
import controlComponent from './ListControl';
import schema from './schema';

const previewComponent = SimpleCmsWidgetObject.previewComponent;

function Widget(opts = {}) {
  return {
    name: 'list',
    controlComponent,
    previewComponent,
    schema,
    ...opts,
  };
}

export const SimpleCmsWidgetList = { Widget, controlComponent, previewComponent };
export default SimpleCmsWidgetList;
