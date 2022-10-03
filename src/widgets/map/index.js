import withMapControl from './withMapControl';
import previewComponent from './MapPreview';
import schema from './schema';

const controlComponent = withMapControl();

function Widget(opts = {}) {
  return {
    name: 'map',
    controlComponent,
    previewComponent,
    schema,
    ...opts,
  };
}

export const StaticCmsWidgetMap = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetMap;
