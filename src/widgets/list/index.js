import StaticCmsWidgetObject from '../object';
import controlComponent from './ListControl';
import schema from './schema';

const previewComponent = StaticCmsWidgetObject.previewComponent;

function Widget(opts = {}) {
  return {
    name: 'list',
    controlComponent,
    previewComponent,
    schema,
    ...opts,
  };
}

export const StaticCmsWidgetList = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetList;
