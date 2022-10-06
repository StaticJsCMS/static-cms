import withFileControl, { getValidValue } from './withFileControl';
import previewComponent from './FilePreview';
import schema from './schema';

const controlComponent = withFileControl();

function Widget() {
  return {
    name: 'file',
    controlComponent,
    previewComponent,
    options: {
      schema,
      getValidValue,
    },
  };
}

export const StaticCmsWidgetFile = { Widget, controlComponent, previewComponent, withFileControl };
export default StaticCmsWidgetFile;
